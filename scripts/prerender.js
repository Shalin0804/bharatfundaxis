// Renders every route to static HTML (dist/<route>.html) with per-page head tags, then writes sitemap.xml.
// Hosts with "clean URLs" (Vercel cleanUrls, Netlify, most static hosts) serve /contact from contact.html.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const { PAGES, headTags } = await import(pathToFileURL(path.join(root, 'src/seo.js')).href)
const { SITE_URL } = await import(pathToFileURL(path.join(root, 'src/data/site.js')).href)

// Preload the fonts the above-the-fold hero needs (names are content-hashed, so look them up).
const assets = fs.readdirSync(path.join(dist, 'assets'))
// Only the faces the hero headline and copy render with (~86 KB). Preloading more measured worse:
// preloads compete for bandwidth and can hold first render.
const preloads = ['newsreader-latin-400', 'hanken-grotesk-latin-400', 'noto-sans-devanagari-devanagari-400']
  .map((name) => assets.find((f) => f.startsWith(`${name}-normal-`) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8').replace('<!--head-->', `<!--head-->\n    ${preloads}`)
const build = async (url) => template.replace('<!--head-->', headTags(url)).replace('<!--app-->', await render(url))

for (const url of Object.keys(PAGES)) {
  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`
  fs.writeFileSync(path.join(dist, file), await build(url))
  console.log('prerendered', url, '->', file)
}
fs.writeFileSync(path.join(dist, '404.html'), await build('/__not-found__'))

const today = new Date().toISOString().slice(0, 10)
const urls = Object.entries(PAGES)
  .map(([u, m]) => `  <url>\n    <loc>${SITE_URL}${u === '/' ? '' : u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${m.changefreq}</changefreq>\n    <priority>${m.priority}</priority>\n  </url>`)
  .join('\n')
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('sitemap.xml written')
