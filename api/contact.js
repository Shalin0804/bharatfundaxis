// POST /api/contact — receives website enquiries and emails them to the advisory desk via Resend.
// Required env (set in the host dashboard, never committed):
//   RESEND_API_KEY      Resend API key
//   CONTACT_TO_EMAIL    inbox that receives enquiries (e.g. support@bharatfundaxis.com)
//   CONTACT_FROM_EMAIL  verified sender, e.g. "BharatFundAxis Website <noreply@bharatfundaxis.com>"
import { validateEnquiry, escapeHtml } from './_validate.js'

// ponytail: per-instance in-memory rate limit; resets on cold start. Use Vercel KV/Upstash if abuse appears.
const hits = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  const limited = recent.length >= MAX_PER_WINDOW
  if (!limited) recent.push(now) // never grows past MAX_PER_WINDOW
  hits.set(ip, recent)
  if (hits.size > 5000) {
    // drop only expired buckets so a flood of IPs can't reset everyone's limit
    for (const [k, ts] of hits) if (!ts.some((t) => now - t < WINDOW_MS)) hits.delete(k)
  }
  return limited
}

const LABELS = {
  fullName: 'Name', email: 'Email', phone: 'Phone', topic: 'Topic', enterpriseType: 'Business / Enterprise',
  fundingAmount: 'Funding requirement', stage: 'Stage / Timeframe', consultationFocus: 'Consultation focus',
  timeframe: 'Target timeframe', message: 'Message',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed.' })
  }

  // x-real-ip is set by Vercel's edge and can't be spoofed by the client.
  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return res.status(429).json({ success: false, error: 'Too many requests. Please try again in a few minutes.' })

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = null }
  }
  const result = validateEnquiry(body)
  // Pretend success to bots that fill the honeypot so they don't retry.
  if (result.spam) return res.status(200).json({ success: true })
  if (!result.ok) return res.status(400).json({ success: false, error: result.error })

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('contact: email delivery is not configured (missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL)')
    return res.status(503).json({ success: false, error: 'Enquiry service is not configured yet. Please email support@bharatfundaxis.com.' })
  }

  const d = result.data
  const rows = Object.keys(LABELS)
    .filter((k) => d[k])
    .map((k) => `<tr><td style="padding:6px 12px;color:#48557a">${LABELS[k]}</td><td style="padding:6px 12px;color:#0a1838">${escapeHtml(d[k]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')
  const text = Object.keys(LABELS).filter((k) => d[k]).map((k) => `${LABELS[k]}: ${d[k]}`).join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: d.email,
        subject: `New enquiry: ${d.topic} — ${d.fullName}`,
        html: `<h2 style="font-family:Georgia,serif;color:#0a1838">${escapeHtml(d.topic)}</h2><table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
        text,
      }),
    })
    if (!r.ok) {
      console.error('contact: Resend error', r.status, await r.text())
      return res.status(502).json({ success: false })
    }
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('contact: send failed', err)
    return res.status(502).json({ success: false })
  }
}
