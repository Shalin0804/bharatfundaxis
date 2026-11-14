import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Dialog } from './ui.jsx'
import EnquiryForm from './EnquiryForm.jsx'
import { POPUP } from '../data/contact.js'
import { FORM_MESSAGES_EN } from '../data/site.js'

const KEY = 'bfa-popup-seen'

/**
 * Advisory popup. The live site opens it after 5s and again every 30s; this version opens
 * once per browser session after 5s and never on /contact (deliberate UX change, see docs).
 */
export default function Popup() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/contact') return
    let seen = false
    try { seen = sessionStorage.getItem(KEY) === '1' } catch { /* storage blocked */ }
    if (seen) return
    const t = setTimeout(() => {
      setOpen(true)
      try { sessionStorage.setItem(KEY, '1') } catch { /* storage blocked */ }
    }, 5000)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <Dialog open={open} onClose={() => setOpen(false)} label={POPUP.title} className="w-[min(46rem,calc(100vw-1.5rem))]">
      <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
        <img src="/img/popup.webp" alt="BharatFundAxis Contact Advisory" width="640" height="960" loading="lazy" className="hidden h-full w-full object-cover sm:block" />
        <div className="p-6 sm:p-8">
          <h2 className="display-md">{POPUP.title}</h2>
          <p className="mb-6 mt-2 text-sm">{POPUP.copy}</p>
          <EnquiryForm
            topic={POPUP.topic}
            defaultMessage={POPUP.defaultMessage}
            placeholders={POPUP.placeholders}
            messages={{ ...FORM_MESSAGES_EN, submit: POPUP.submit, submitting: POPUP.submitting }}
          />
        </div>
      </div>
    </Dialog>
  )
}
