import Icon from './Icon.jsx'
import { CheckList } from './ui.jsx'

/** Forest-green advisory panel + white form card, shared by several pages. */
export default function AdvisoryBlock({ id, image, imageAlt, eyebrow, title, copy, note, points, formEyebrow, formTitle, formCopy, form }) {
  return (
    <section id={id} className="section">
      <div className="wrap grid overflow-hidden rounded-[var(--radius-panel)] bg-white shadow-[0_40px_80px_-50px_rgb(11_74_58/0.5)] ring-1 ring-line lg:grid-cols-2">
        <div className="axis-field on-dark relative flex flex-col justify-end p-8 text-white sm:p-12">
          <img src={image} alt={imageAlt} width="900" height="900" loading="lazy" className="absolute inset-0 size-full object-cover object-top opacity-25" />
          <div className="relative">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="display-lg mt-5 text-white">{title}</h2>
            <p className="mt-4 text-mist">{copy}</p>
            {points && <CheckList items={points} className="mt-6 text-white" dark />}
            {note && <p className="mt-8 flex items-center gap-2 text-sm text-gold-pale"><Icon name="shield" size={18} className="text-gold" />{note}</p>}
          </div>
        </div>
        <div className="p-6 sm:p-12">
          {formEyebrow && <p className="eyebrow mb-3">{formEyebrow}</p>}
          <h3 className="display-md">{formTitle}</h3>
          {formCopy && <p className="mb-7 mt-2">{formCopy}</p>}
          {!formCopy && <div className="mb-7" />}
          {form}
        </div>
      </div>
    </section>
  )
}
