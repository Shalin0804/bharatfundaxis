import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateEnquiry, escapeHtml } from './_validate.js'

const good = { fullName: 'Asha Verma', email: 'Asha@Example.com', phone: '9876543210', topic: 'General Enquiry', message: 'Hi' }

test('accepts a valid enquiry and normalises fields', () => {
  const r = validateEnquiry({ ...good, phone: '+91 98765-43210' })
  assert.equal(r.ok, true)
  assert.equal(r.data.email, 'asha@example.com')
  assert.equal(r.data.phone, '9876543210')
})

test('accepts Devanagari names', () => {
  assert.equal(validateEnquiry({ ...good, fullName: 'आशा वर्मा' }).ok, true)
})

test('rejects bad name, email, phone', () => {
  assert.equal(validateEnquiry({ ...good, fullName: 'A' }).ok, false)
  assert.equal(validateEnquiry({ ...good, email: 'nope' }).ok, false)
  assert.equal(validateEnquiry({ ...good, phone: '1234567890' }).ok, false)
  assert.equal(validateEnquiry(null).ok, false)
})

test('flags honeypot as spam', () => {
  const r = validateEnquiry({ ...good, website: 'http://spam' })
  assert.equal(r.ok, false)
  assert.equal(r.spam, true)
})

test('truncates long fields and drops unknown keys', () => {
  const r = validateEnquiry({ ...good, message: 'x'.repeat(5000), evil: '<script>' })
  assert.equal(r.data.message.length, 2000)
  assert.equal('evil' in r.data, false)
})

test('escapes html', () => {
  assert.equal(escapeHtml('<b>"x"&\''), '&lt;b&gt;&quot;x&quot;&amp;&#39;')
})

test('single-line fields and names lose newlines', () => {
  const r = validateEnquiry({ ...good, topic: 'A\r\nBcc: x@y.com', message: 'line1\nline2' })
  assert.equal(r.data.topic, 'A Bcc: x@y.com')
  assert.equal(r.data.message, 'line1\nline2')
  assert.equal(validateEnquiry({ ...good, fullName: 'Asha\nVerma' }).data.fullName, 'Asha Verma')
})

test('accepts +91 0 prefix and catches non-string honeypot', () => {
  assert.equal(validateEnquiry({ ...good, phone: '+91 09876543210' }).data.phone, '9876543210')
  assert.equal(validateEnquiry({ ...good, website: true }).spam, true)
})

test('contact handler: emails the desk and returns a reference ID only after delivery', async () => {
  const { default: handler, makeRef } = await import('./contact.js')
  assert.match(makeRef(), /^BFA-\d{6}-[A-HJ-NP-Z2-9]{6}$/)
  Object.assign(process.env, { RESEND_API_KEY: 'k', CONTACT_FROM_EMAIL: 'Site <noreply@example.com>' })
  const call = async (status, body = { ...good, elapsed: 9000 }) => {
    const sent = []
    globalThis.fetch = async (url, init) => { sent.push(JSON.parse(init.body)); return new Response('{}', { status }) }
    let out
    const res = { setHeader() {}, status(c) { return { json: (j) => (out = { c, j }) } } }
    await handler({ method: 'POST', headers: { host: 'x', 'x-real-ip': String(Math.random()) }, body }, res)
    return { ...out, sent }
  }
  const ok = await call(200)
  assert.equal(ok.c, 200)
  assert.match(ok.j.ref, /^BFA-/)
  assert.deepEqual(ok.sent[0].to, ['support@bharatfundaxis.com'])
  assert.match(ok.sent[0].subject, /^\[General Enquiry\] New website enquiry BFA-/)
  assert.ok(ok.sent[0].text.includes('Phone: 9876543210') && ok.sent[0].text.includes(ok.j.ref))
  const fail = await call(500)
  assert.equal(fail.c, 502)
  assert.equal(fail.j.success, false)
  const bot = await call(200, { ...good, elapsed: 300 })
  assert.equal(bot.sent.length, 0) // too fast: no email, but a normal-looking reply
})
