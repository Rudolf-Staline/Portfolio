import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'
import { allRoutes, getMetadata, projectPath } from '../dist-ssr/entry-server.js'

const origin = 'https://rudolf-hounlete-portfolio.vercel.app'
const broken = new Set()
for (const route of allRoutes) {
  const m = getMetadata(route)
  const html = await readFile(join('dist', route, 'index.html'), 'utf8')
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: exactly one heading`)
  assert(html.includes(`<html lang="${m.locale}">`), `${route}: document language`)
  assert(html.includes(`rel="canonical" href="${origin}${route}"`), `${route}: canonical URL`)
  assert(!html.includes('<!--app-html-->'), `${route}: no rendering placeholder`)
  assert(!html.includes('rudolf43.chatgpt.site'), `${route}: no private origin`)
  assert(!/AlphaLab|ReverseFlow|Aurora Player|Omed Player|Laundry|Horizon/.test(html), `${route}: no unverified or excluded projects`)
  const body = html.slice(html.indexOf('<body>'))
  assert(body.includes(m.id ? 'study-prose' : 'archive-grid'), `${route}: content exists before JavaScript`)
  const other = m.locale === 'fr' ? 'en' : 'fr'
  const altPath = m.id ? projectPath(m.id, other) : other === 'fr' ? '/' : '/en/'
  assert(html.includes(`hreflang="${other}" href="${origin}${altPath}"`), `${route}: matching translated page`)
  if (!m.id) assert.equal((html.match(/class="archive-item"/g) || []).length, 14, `${route}: full catalogue in initial HTML`)
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
    const path = match[1].split('#')[0]
    try { await access(join('dist', path, path.endsWith('/') ? 'index.html' : '')) }
    catch { broken.add(`${route} → ${path}`) }
  }
}
assert.equal(broken.size, 0, `Broken local links:\n${[...broken].join('\n')}`)
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
assert.equal((sitemap.match(/<loc>/g) || []).length, 30)
assert((await readFile('dist/404.html', 'utf8')).includes('name="robots" content="noindex"'))
for (const id of ['risksim', 'automl', '01']) for (const locale of ['fr', 'en']) {
  const svg = await readFile(`dist/architecture/${id}-${locale}.svg`, 'utf8')
  assert(svg.includes('<title id="title">'))
  assert(svg.includes(`xml:lang="${locale}"`))
}
console.log('Verified 30 pre-rendered pages, 14 projects in both languages, translated canonicals, local links, sitemap, 404 and six SVGs.')
