// Scroll reveals: marks each `.reveal` element with [data-shown] the first time it nears the viewport
// (index.css animates it in). Elements that enter together are staggered. Runs once, after hydration, and
// watches #root for elements added later (route changes, tabs, filters).
export function startReveal() {
  const SEL = '.reveal:not([data-shown])'
  const show = (el, i = 0) => {
    el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 90}ms`)
    el.setAttribute('data-shown', '')
  }
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(SEL).forEach((el) => show(el))
    return () => {}
  }
  const io = new IntersectionObserver(
    (entries) => {
      let i = 0
      for (const e of entries) {
        if (!e.isIntersecting) continue
        show(e.target, i++)
        io.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  const scan = (node) => {
    if (node.matches?.(SEL)) io.observe(node)
    node.querySelectorAll?.(SEL).forEach((el) => io.observe(el))
  }
  scan(document)
  document.documentElement.classList.add('reveal-ready')
  const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && scan(n))))
  mo.observe(document.getElementById('root'), { childList: true, subtree: true })
  return () => {
    io.disconnect()
    mo.disconnect()
  }
}
