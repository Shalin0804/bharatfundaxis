import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

/** Renders a route to HTML, waiting for lazy route chunks to resolve. */
export async function render(url) {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  return new Response(prelude).text()
}
