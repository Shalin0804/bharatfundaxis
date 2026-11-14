import { useId, useRef } from 'react'

/**
 * WAI-ARIA tablist. Renders tabs via `renderTab(item, selected)`; arrow keys / Home / End move focus+selection.
 * The caller renders the panel with `panelProps` so ids line up.
 */
export function useTabs(count, active, setActive) {
  const base = useId()
  const refs = useRef([])
  const onKeyDown = (e) => {
    const map = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: count - 1 }
    if (!(e.key in map)) return
    e.preventDefault()
    const next = (map[e.key] + count) % count
    setActive(next)
    refs.current[next]?.focus()
  }
  const tabProps = (i) => ({
    ref: (el) => (refs.current[i] = el),
    role: 'tab',
    type: 'button',
    id: `${base}-tab-${i}`,
    'aria-selected': i === active,
    'aria-controls': `${base}-panel`,
    tabIndex: i === active ? 0 : -1,
    onClick: () => setActive(i),
    onKeyDown,
  })
  const panelProps = { role: 'tabpanel', id: `${base}-panel`, 'aria-labelledby': `${base}-tab-${active}`, tabIndex: 0 }
  return { tabProps, panelProps }
}
