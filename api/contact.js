// POST /api/contact — validates a website enquiry, emails it to the business inbox, and replies with a reference ID.
// The visitor only sees success once the email has been accepted for delivery.
//
// Env (set in the host dashboard, never committed; see .env.example):
//   CONTACT_TO_EMAIL     inbox(es) that receive enquiries, default support@bharatfundaxis.com
//   CONTACT_FROM_EMAIL   sender, e.g. "BharatFundAxis Website <noreply@bharatfundaxis.com>"
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   SMTP delivery via Nodemailer (used when SMTP_HOST is set)
//   RESEND_API_KEY       Resend delivery (used when SMTP is not configured)
// Optional:
//   WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TO, WHATSAPP_TEMPLATE, WHATSAPP_TEMPLATE_LANG
//                        WhatsApp Business (Cloud API) alert to the business number
//   KV_REST_API_URL, KV_REST_API_TOKEN   Vercel KV / Upstash Redis: stores each enquiry and enforces the rate limit
import { randomBytes } from 'node:crypto'
import nodemailer from 'nodemailer'
import { validateEnquiry, escapeHtml } from './_validate.js'

const WINDOW_S = 10 * 60
const MAX_PER_WINDOW = 5
const MIN_FILL_MS = 2500 // humans take longer than this to fill a form; scripts don't

const LABELS = {
  topic: 'Enquiry type', fullName: 'Name', email: 'Email', phone: 'Phone', enterpriseType: 'Company / Business',
  fundingAmount: 'Funding requirement', stage: 'Stage / Timeframe', consultationFocus: 'Consultation focus',
  timeframe: 'Target timeframe', message: 'Message', source: 'Submitted from',
}

const kv = () => process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
async function redis(...commands) {
  const r = await fetch(`${process.env.KV_REST_API_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    body: JSON.stringify(commands),
  })
  if (!r.ok) throw new Error(`kv ${r.status}`)
  return r.json()
}

// ponytail: without KV the limit is per serverless instance and resets on cold start.
const hits = new Map()
async function rateLimited(ip) {
  if (kv()) {
    try {
      const [{ result: n }] = await redis(['INCR', `rl:${ip}`], ['EXPIRE', `rl:${ip}`, WINDOW_S, 'NX'])
      return n > MAX_PER_WINDOW
    } catch (err) {
      console.error('contact: kv rate limit failed, using memory', err)
    }
  }
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_S * 1000)
  const limited = recent.length >= MAX_PER_WINDOW
  if (!limited) recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, ts] of hits) if (!ts.some((t) => now - t < WINDOW_S * 1000)) hits.delete(k)
  return limited
}

/** BFA-YYMMDD-XXXXXX, e.g. BFA-261115-7K3QMZ (no 0/O/1/I to avoid misreading over the phone). */
export function makeRef(date = new Date()) {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const id = [...randomBytes(6)].map((b) => abc[b % abc.length]).join('')
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: '2-digit', month: '2-digit', day: '2-digit' })
    .format(date).replace(/-/g, '')
  return `BFA-${ymd}-${id}`
}

export function buildEmail(d, ref, date) {
  const when = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' }) + ' IST'
  const rows = [['Reference ID', ref], ['Received', when], ...Object.keys(LABELS).filter((k) => d[k]).map((k) => [LABELS[k], d[k]])]
  const html =
    `<h2 style="font-family:Georgia,serif;color:#0b4a3a;margin:0 0 12px">${escapeHtml(d.topic)}</h2>` +
    `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:6px 12px;color:#3b4744;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#0b4a3a">${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`).join('') +
    `</table>`
  return {
    subject: `[${d.topic}] New website enquiry ${ref} from ${d.fullName}`,
    html,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
  }
}

async function sendEmail({ to, from, replyTo, subject, html, text }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RESEND_API_KEY } = process.env
  if (SMTP_HOST) {
    const port = Number(SMTP_PORT) || 465
    const transport = nodemailer.createTransport({
      host: SMTP_HOST, port, secure: port === 465, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
    })
    await transport.sendMail({ to, from, replyTo, subject, html, text })
    return
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: replyTo, subject, html, text }),
  })
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
}

/** Best effort: a WhatsApp alert must never block or fail the enquiry. Business-initiated messages need an
 *  approved template (WHATSAPP_TEMPLATE, one {{1}} body variable); without one, a plain text message is sent,
 *  which WhatsApp only delivers inside an open 24-hour conversation window. */
async function notifyWhatsApp(d, ref) {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TO, WHATSAPP_TEMPLATE, WHATSAPP_TEMPLATE_LANG } = process.env
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_TO) return
  const summary = `${ref} | ${d.topic} | ${d.fullName} | ${d.phone} | ${d.email}`
  const message = WHATSAPP_TEMPLATE
    ? { type: 'template', template: { name: WHATSAPP_TEMPLATE, language: { code: WHATSAPP_TEMPLATE_LANG || 'en' }, components: [{ type: 'body', parameters: [{ type: 'text', text: summary }] }] } }
    : { type: 'text', text: { body: `New website enquiry\n${summary}${d.message ? `\n\n${d.message}` : ''}` } }
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to: WHATSAPP_TO, ...message }),
      signal: AbortSignal.timeout(6000),
    })
    if (!r.ok) console.error('contact: WhatsApp error', r.status, await r.text())
  } catch (err) {
    console.error('contact: WhatsApp failed', err)
  }
}

async function store(d, ref, date, ip) {
  if (!kv()) return
  try {
    await redis(['LPUSH', 'enquiries', JSON.stringify({ ref, at: date.toISOString(), ip, ...d })])
  } catch (err) {
    console.error('contact: storing enquiry failed', ref, err)
  }
}

const hostOf = (u) => { try { return new URL(u).host } catch { return null } }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed.' })
  }
  // Browsers always send Origin on a cross-site POST; reject other sites posting into this form.
  const origin = req.headers.origin
  if (origin && hostOf(origin) !== req.headers.host) return res.status(403).json({ success: false, error: 'Forbidden.' })

  // x-real-ip is set by Vercel's edge and can't be spoofed by the client.
  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (await rateLimited(ip)) return res.status(429).json({ success: false, error: 'Too many requests. Please try again in a few minutes.' })

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = null }
  }
  const result = validateEnquiry(body)
  // Bots (honeypot filled, or submitted faster than a person can type) get a normal-looking reply so they don't retry.
  const tooFast = body && Number.isFinite(body.elapsed) && body.elapsed < MIN_FILL_MS
  if (result.spam || (result.ok && tooFast)) return res.status(200).json({ success: true, ref: makeRef() })
  if (!result.ok) return res.status(400).json({ success: false, error: result.error })

  const { CONTACT_FROM_EMAIL, SMTP_HOST, RESEND_API_KEY } = process.env
  const to = (process.env.CONTACT_TO_EMAIL || 'support@bharatfundaxis.com').split(',').map((s) => s.trim()).filter(Boolean)
  if (!CONTACT_FROM_EMAIL || (!SMTP_HOST && !RESEND_API_KEY)) {
    console.error('contact: email delivery is not configured (set SMTP_* or RESEND_API_KEY, and CONTACT_FROM_EMAIL)')
    return res.status(503).json({ success: false, error: 'Enquiry service is not configured yet. Please email support@bharatfundaxis.com.' })
  }

  const d = result.data
  const date = new Date()
  const ref = makeRef(date)
  try {
    await sendEmail({ to, from: CONTACT_FROM_EMAIL, replyTo: d.email, ...buildEmail(d, ref, date) })
  } catch (err) {
    console.error('contact: send failed', ref, err)
    return res.status(502).json({ success: false })
  }
  await Promise.all([notifyWhatsApp(d, ref), store(d, ref, date, ip)])
  return res.status(200).json({ success: true, ref })
}
