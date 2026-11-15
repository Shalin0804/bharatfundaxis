import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { validateField, submitEnquiry, whatsappUrl } from '../lib/enquiry.js'
import { FORM_MESSAGES_EN } from '../data/site.js'
import Icon from './Icon.jsx'

/**
 * Shared enquiry form (name / email / phone / message + optional extra fields).
 * `extra` renders additional controls; their values are merged via `extraValues`.
 */
export default function EnquiryForm({
  topic,
  defaultMessage,
  placeholders = {},
  labels,
  messages = FORM_MESSAGES_EN,
  consent = { prefix: 'By submitting, you agree to our', suffix: '.' },
  buildPayload,
  extra,
  dark = false,
  submitClass = 'btn-ink',
}) {
  const uid = useId()
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // {type, message}
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null) // {ref, wa} after a confirmed delivery
  // When the form appeared, for the server's too-fast spam check. Not the first keystroke: browser autofill
  // plus a quick submit would then look like a bot and be dropped.
  const started = useRef(0)
  useEffect(() => { started.current = Date.now() }, [])
  const doneRef = useRef(null)
  // The confirmation is shorter than the form, so bring it into view and move focus to it.
  useEffect(() => {
    if (!done) return
    doneRef.current?.scrollIntoView({ block: 'center' })
    doneRef.current?.focus({ preventScroll: true })
  }, [done])

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: validateField(name, value, messages) }))
  }
  const blur = (e) => {
    const { name, value } = e.target
    if (value) setErrors((er) => ({ ...er, [name]: validateField(name, value, messages) }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const next = Object.fromEntries(['name', 'email', 'phone'].map((k) => [k, validateField(k, values[k], messages)]))
    setErrors(next)
    const firstBad = ['name', 'email', 'phone'].find((k) => next[k])
    if (firstBad) {
      form.querySelector(`[name="${firstBad}"]`)?.focus()
      return
    }
    setBusy(true)
    setStatus(null)
    const extraData = Object.fromEntries(new FormData(form))
    const base = {
      fullName: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      topic,
      message: values.message.trim() || defaultMessage,
      website: values.website, // honeypot
      source: window.location.pathname,
      elapsed: started.current ? Date.now() - started.current : 0,
    }
    const payload = buildPayload ? buildPayload(base, extraData) : base
    // Success is shown only once the server confirms the email was delivered.
    const r = await submitEnquiry(payload)
    setBusy(false)
    if (!r.ok) return setStatus({ type: 'error', message: r.error || messages.error })
    setValues({ name: '', email: '', phone: '', message: '', website: '' })
    form.reset()
    setDone({ ref: r.ref, wa: whatsappUrl({ ...payload, ref: r.ref }) })
  }

  const labelCls = `mb-1.5 block text-sm font-medium ${dark ? 'text-white' : 'text-ink'}`
  const field = (name, type, autoComplete, inputMode) => (
    <div>
      <label htmlFor={`${uid}-${name}`} className={labelCls}>
        {labels ? labels[name] : placeholders[name]}
      </label>
      <input
        id={`${uid}-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={values[name]}
        onChange={update}
        onBlur={blur}
        placeholder={labels ? placeholders[name] : undefined}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `${uid}-${name}-err` : undefined}
        className="field"
      />
      {errors[name] && (
        <p id={`${uid}-${name}-err`} className="mt-1.5 text-sm text-[#b42318]">
          {errors[name]}
        </p>
      )}
    </div>
  )

  if (done) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className={`outline-none border-l-2 border-gold p-5 sm:p-6 ${dark ? 'bg-white/5 text-white' : 'bg-royal-soft text-ink'}`}>
        <Icon name="check" size={22} className={dark ? 'text-gold' : 'text-royal'} />
        <p className="mt-3 font-display text-xl leading-snug">{messages.success}</p>
        {done.ref && (
          <p className="mt-4 text-sm">
            {messages.refLabel || 'Enquiry reference ID'}
            <span className="mono mt-1 block select-all text-lg font-medium tracking-wider">{done.ref}</span>
          </p>
        )}
        <div className="cta-row mt-5">
          <a href={done.wa} className="btn btn-ink">{messages.whatsapp || 'Continue on WhatsApp'} <Icon name="arrow" size={18} /></a>
          <button type="button" onClick={() => { setDone(null); setStatus(null); started.current = Date.now() }} className="btn btn-ghost">{messages.another || 'Send another enquiry'}</button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      {field('name', 'text', 'name')}
      {field('email', 'email', 'email', 'email')}
      {field('phone', 'tel', 'tel-national', 'tel')}
      {extra}
      <div>
        <label htmlFor={`${uid}-message`} className={labelCls}>
          {labels ? labels.message : placeholders.message}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={update}
          placeholder={labels ? placeholders.message : undefined}
          maxLength={2000}
          className="field resize-y"
        />
      </div>
      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
        </label>
      </div>
      <button type="submit" disabled={busy} className={`btn ${submitClass} min-h-13 w-full text-base disabled:opacity-60`}>
        {busy ? messages.submitting : messages.submit}
      </button>
      <div role="status" aria-live="polite">
        {status && (
          <p
            className={`rounded-lg px-4 py-3 text-sm ${status.type === 'success' ? 'bg-[#e7f6ec] text-[#14532d]' : 'bg-[#fdecea] text-[#8a1c12]'}`}
          >
            {status.message}
          </p>
        )}
      </div>
      <p className={`text-xs ${dark ? 'text-mist' : 'text-slate'}`}>
        {consent.prefix}{' '}
        <Link to="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>
        {consent.and ?? ' and '}
        <Link to="/terms-of-service" className="underline underline-offset-2">Terms &amp; Conditions</Link>
        {consent.suffix}
      </p>
    </form>
  )
}
