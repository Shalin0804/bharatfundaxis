// Server-side validation for enquiry submissions. Files prefixed "_" are not deployed as functions.
const NAME_RE = /^[\p{L}\p{M} .'-]{2,80}$/u // \p{M}: Devanagari matras are combining marks
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/
const PHONE_RE = /^[6-9]\d{9}$/

const LIMITS = { topic: 120, message: 2000, enterpriseType: 120, fundingAmount: 60, stage: 60, consultationFocus: 80, timeframe: 60 }

const oneLine = (v) => v.replace(/[\r\n\t]+/g, ' ')
const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : '')

/** Returns { ok: true, data } or { ok: false, error, spam? }. */
export function validateEnquiry(body) {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body.' }
  if (body.website && String(body.website).trim()) return { ok: false, spam: true, error: 'Rejected.' }

  const fullName = oneLine(clean(body.fullName, 80)).replace(/ {2,}/g, ' ')
  const email = clean(body.email, 254).toLowerCase()
  const phone = clean(body.phone, 20).replace(/[\s-]/g, '').replace(/^(\+91)?0?/, '')

  if (!NAME_RE.test(fullName)) return { ok: false, error: 'Enter a valid name.' }
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Enter a valid email address.' }
  if (!PHONE_RE.test(phone)) return { ok: false, error: 'Enter a valid 10-digit mobile number.' }

  const data = { fullName, email, phone }
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = clean(body[k], max)
    if (v) data[k] = k === 'message' ? v : oneLine(v) // only the message may span lines (keeps the subject single-line)
  }
  if (!data.topic) data.topic = 'Website Enquiry'
  return { ok: true, data }
}

export const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
