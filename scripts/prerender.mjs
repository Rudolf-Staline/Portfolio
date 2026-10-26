import { mkdir, readFile, readdir, writeFile, copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { render, allRoutes, getMetadata, projectPath, homePath, architecture, projectVisuals } from '../dist-ssr/entry-server.js'

const origin = 'https://rudolf-hounlete-portfolio.vercel.app'
const template = await readFile('dist/index.html', 'utf8')
const font = (await readdir('dist/assets')).find(f => /^manrope-latin-wght.*\.woff2$/.test(f))
await mkdir('dist/responsive', { recursive: true })
for (const [id, visual] of Object.entries(projectVisuals)) {
  for (const width of [480, 800, 1200]) await sharp(join('public', visual.src)).resize({ width }).webp({ quality: 78 }).toFile(`dist/responsive/${id}-${width}.webp`)
}
for (const width of [480, 800]) await sharp('public/images/portrait.webp').resize({ width }).webp({ quality: 80 }).toFile(`dist/responsive/portrait-${width}.webp`)
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const safeJson = value => JSON.stringify(value).replaceAll('<', '\\u003c')
const author = { '@type': 'Person', name: 'Rudolf Hounlete', url: `${origin}/`, sameAs: ['https://github.com/Rudolf-Staline'] }

function page(path) {
  const m = getMetadata(path)
  const canonical = origin + (m.notFound ? path : m.path)
  const alternate = locale => origin + (m.id ? projectPath(m.id, locale) : homePath(locale))
  const schema = m.id ? { '@context': 'https://schema.org', '@type': 'CreativeWork', name: m.title.split(' | ')[0], description: m.description, author, url: canonical, inLanguage: m.locale } : { '@context': 'https://schema.org', ...author, description: m.description }
  const head = `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin/>
    <meta name="description" content="${esc(m.description)}"/>
    <link rel="canonical" href="${esc(canonical)}"/>
    <link rel="alternate" hreflang="fr" href="${alternate('fr')}"/>
    <link rel="alternate" hreflang="en" href="${alternate('en')}"/>
    <link rel="alternate" hreflang="x-default" href="${alternate('fr')}"/>
    <meta property="og:title" content="${esc(m.title)}"/>
    <meta property="og:description" content="${esc(m.description)}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="${esc(canonical)}"/>
    <meta property="og:locale" content="${m.locale === 'fr' ? 'fr_FR' : 'en_GB'}"/>
    <meta property="og:image" content="${origin}${m.image}"/>
    <meta property="og:image:alt" content="${esc(m.title)}"/>
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="${esc(m.title)}"/>
    <meta name="twitter:description" content="${esc(m.description)}"/>
    <meta name="twitter:image" content="${origin}${m.image}"/>
    ${m.notFound ? '<meta name="robots" content="noindex"/>' : `<script type="application/ld+json">${safeJson(schema)}</script>`}`
  let html = template.replace('lang="fr"', `lang="${m.locale}"`).replace(/<title>.*?<\/title>/, `<title>${esc(m.title)}</title>`).replace('<!--page-head-->', head).replace('<!--app-html-->', render(path))
  html = html.replace(/<link rel="preload" as="image"[^>]*>/, m.id || m.notFound ? '' : '<link rel="preload" as="image" href="/responsive/portrait-800.webp" imagesrcset="/responsive/portrait-480.webp 480w, /responsive/portrait-800.webp 800w" imagesizes="(max-width: 767px) calc(100vw - 40px), 340px" fetchpriority="high"/>')
  return html
}

for (const path of allRoutes) {
  const target = join('dist', path, 'index.html')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, page(path))
}
await writeFile('dist/404.html', page('/404/'))
const xml = allRoutes.map(path => {
  const m = getMetadata(path)
  const alternate = locale => origin + (m.id ? projectPath(m.id, locale) : homePath(locale))
  return `<url><loc>${origin}${path}</loc><xhtml:link rel="alternate" hreflang="fr" href="${alternate('fr')}"/><xhtml:link rel="alternate" hreflang="en" href="${alternate('en')}"/></url>`
}).join('\n')
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${xml}</urlset>\n`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)

// Exact architecture diagrams use text and vector geometry, never generated imagery.
// The HTML flow and SVG download are generated from the same bilingual data.
await mkdir('dist/architecture', { recursive: true })
await mkdir('public/architecture', { recursive: true })
for (const [id, versions] of Object.entries(architecture)) for (const [locale, data] of Object.entries(versions)) {
  const boxes = data.nodes.map((n, i) => {
    const x = 44 + i * 290, y = 170
    return `<g><rect x="${x}" y="${y}" width="260" height="170" rx="3" fill="#252b29" stroke="#59625b"/><text x="${x + 20}" y="${y + 30}" class="number">0${i + 1}</text><text x="${x + 20}" y="${y + 66}" class="node">${esc(n.title)}</text>${wrap(n.detail, 30).map((line, j) => `<text x="${x + 20}" y="${y + 96 + j * 20}" class="detail">${esc(line)}</text>`).join('')}${n.owner ? `<text x="${x + 20}" y="${y + 150}" class="owner">${esc(n.owner)}</text>` : ''}</g>${i < 3 ? `<path d="M ${x+266} 255 h 18 m -5 -5 l 5 5 -5 5" fill="none" stroke="#ed998a" stroke-width="2"/>` : ''}`
  }).join('')
  const lines = wrap(data.note, 120)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="570" viewBox="0 0 1240 570" role="img" aria-labelledby="title desc" xml:lang="${locale}"><title id="title">${esc(data.title)}</title><desc id="desc">${esc(data.nodes.map(n => `${n.title}: ${n.detail}`).join(' → '))}</desc><style>text{font-family:Arial,sans-serif}.title{font-size:30px;font-weight:700;fill:#f3f4ef}.subtitle{font-size:16px;fill:#c0c7bf}.number,.owner{font-size:12px;fill:#ed998a}.node{font-size:18px;font-weight:700;fill:#f3f4ef}.detail{font-size:14px;fill:#c0c7bf}.check{font-size:14px;fill:#f3f4ef}.note{font-size:13px;fill:#b8c0b7}</style><rect width="1240" height="570" fill="#1d211e"/><rect x="44" y="42" width="44" height="4" fill="#ed998a"/><text x="44" y="90" class="title">${esc(data.title)}</text><text x="44" y="122" class="subtitle">${esc(data.description)}</text>${boxes}<path d="M44 382 H1174" stroke="#59625b"/>${data.checks.map((s,i) => `<text x="${44+i*385}" y="416" class="check">${esc(s)}</text>`).join('')}${lines.map((s,i) => `<text x="44" y="${464+i*21}" class="note">${esc(s)}</text>`).join('')}<text x="44" y="540" class="owner">Rudolf Hounlete / ${id === '01' ? 'PediAppend' : id === 'automl' ? 'Autonomous AutoML' : 'RiskSim'}</text></svg>`
  const file = `architecture/${id}-${locale}.svg`
  await writeFile(join('public', file), svg)
  await copyFile(join('public', file), join('dist', file))
}
function wrap(value, max) {
  const lines = ['']
  for (const word of value.split(' ')) {
    const last = lines.length - 1
    if (lines[last] && (lines[last] + ' ' + word).length > max) lines.push(word)
    else lines[last] += (lines[last] ? ' ' : '') + word
  }
  return lines
}
console.log(`Pre-rendered ${allRoutes.length} bilingual pages, 404, sitemap, robots and 6 SVG diagrams.`)
