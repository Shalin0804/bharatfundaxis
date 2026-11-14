import { useId, useState } from 'react'
import { Link } from 'react-router'
import { validateField, submitEnquiry, whatsappUrl } from '../lib/enquiry.js'
import { FORM_MESSAGES_EN } from '../data/site.js'

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
  submitClass = 'btn-royal',
}) {
  const uid = useId()
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // {type, message}
  const [busy, setBusy] = useState(false)

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
    }
    const payload = buildPayload ? buildPayload(base, extraData) : base
    // Email the desk first (capped wait), then hand the visitor to WhatsApp with their details pre-typed.
    // The redirect happens even if email delivery fails, so no enquiry is lost.
    await submitEnquiry(payload)
    if (values.website) return setBusy(false) // honeypot: bots don't get redirected
    setStatus({ type: 'success', message: messages.redirecting })
    setValues({ name: '', email: '', phone: '', message: '', website: '' })
    form.reset()
    window.location.assign(whatsappUrl(payload))
  }

  const labelCls = `mb-1.5 block text-sm font-medium ${dark ? 'text-white' : 'text-ink'}`
  const field = (name, type, autoComplete, inputMode) => (
    <div>
      <label htmlFor={`${uid}-${name}`} className={labels ? labelCls : 'sr-only'}>
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
        placeholder={placeholders[name]}
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

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      {field('name', 'text', 'name')}
      {field('email', 'email', 'email', 'email')}
      {field('phone', 'tel', 'tel-national', 'numeric')}
      {extra}
      <div>
        <label htmlFor={`${uid}-message`} className={labels ? labelCls : 'sr-only'}>
          {labels ? labels.message : placeholders.message}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={update}
          placeholder={placeholders.message}
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
      <button type="submit" disabled={busy} className={`btn ${submitClass} w-full disabled:opacity-60`}>
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
