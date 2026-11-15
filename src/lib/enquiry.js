import { WHATSAPP_NUMBER } from '../data/site.js'

// Client validation mirrors the live site's rules; the API re-validates (never trust the client).
// Unicode letters + marks so Devanagari names (with matras) validate on this Hindi-first site.
export const NAME_RE = /^[\p{L}\p{M}\s.'-]{2,50}$/u
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^[6-9]\d{9}$/

export function validateField(name, value, msg) {
  const v = (value || '').trim()
  if (name === 'name') return !v ? msg.nameRequired : NAME_RE.test(v) ? '' : msg.nameInvalid
  if (name === 'email') return !v ? msg.emailRequired : EMAIL_RE.test(v) ? '' : msg.emailInvalid
  if (name === 'phone') return !v ? msg.phoneRequired : PHONE_RE.test(v) ? '' : msg.phoneInvalid
  return ''
}

/** POSTs to /api/contact. The server answers only after the email is sent, so allow it time. Returns {ok, ref, error}. */
export async function submitEnquiry(payload) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    })
    const data = await res.json().catch(() => ({}))
    return { ok: res.ok && data.success === true, ref: data.ref, error: data.error }
  } catch {
    return { ok: false }
  }
}

const WA_LABELS = {
  topic: 'Topic', fullName: 'Name', email: 'Email', phone: 'Phone', enterpriseType: 'Business',
  fundingAmount: 'Funding requirement', stage: 'Stage', consultationFocus: 'Consultation focus',
  timeframe: 'Timeframe', message: 'Message',
}

/** wa.me link to the advisory desk with the visitor's enquiry pre-typed. */
export function whatsappUrl(payload) {
  const lines = Object.entries(WA_LABELS)
    .filter(([k]) => payload[k])
    .map(([k, label]) => `${label}: ${payload[k]}`)
  const text = ['Hello BharatFundAxis, I just submitted an enquiry on your website.', '', ...(payload.ref ? [`Reference ID: ${payload.ref}`] : []), ...lines].join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
