import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { after, before, test } from 'node:test'

const port = 3137
const localOrigin = `http://127.0.0.1:${port}`
const productionOrigin = 'https://pirun-portfolio.vercel.app'
const expectedTitle = 'Senior Web Developer in Bangkok | Pirun Kongsaeng'

const expectedSitemapUrls = [
  productionOrigin,
  `${productionOrigin}/projects`,
  `${productionOrigin}/resume`,
  `${productionOrigin}/case-study/gatac`,
  `${productionOrigin}/case-study/foley`,
  `${productionOrigin}/case-study/expandasign`,
  `${productionOrigin}/case-study/storyfilms`,
  `${productionOrigin}/case-study/mdf`,
  `${productionOrigin}/case-study/flip-films`,
  `${productionOrigin}/case-study/altalena`,
  `${productionOrigin}/case-study/hype`,
  `${productionOrigin}/case-study/newstart`,
  `${productionOrigin}/case-study/aj-flooring`,
  `${productionOrigin}/case-study/view-ningaloo`,
  `${productionOrigin}/case-study/will-fitness`,
  `${productionOrigin}/case-study/hwd`,
  `${productionOrigin}/case-study/tartan`,
  `${productionOrigin}/case-study/asl`,
]

let server
let serverOutput = ''

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
  )
}

function metaContent(html, attribute, value) {
  const tag = (html.match(/<meta\b[^>]*>/g) ?? [])
    .map((candidate) => ({ candidate, attributes: attributes(candidate) }))
    .find(({ attributes: parsed }) => parsed[attribute] === value)

  assert.ok(tag, `missing meta[${attribute}="${value}"]`)
  return tag.attributes.content
}

function linkHref(html, rel) {
  const tag = (html.match(/<link\b[^>]*>/g) ?? [])
    .map((candidate) => ({ candidate, attributes: attributes(candidate) }))
    .find(({ attributes: parsed }) => parsed.rel === rel)

  assert.ok(tag, `missing link[rel="${rel}"]`)
  return tag.attributes.href
}

async function waitForServer() {
  const timeoutAt = Date.now() + 60_000

  while (Date.now() < timeoutAt) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready:\n${serverOutput}`)
    }

    try {
      const response = await fetch(localOrigin)
      if (response.ok) return
    } catch {
      // The development server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`Next.js did not become ready within 60 seconds:\n${serverOutput}`)
}

before(async () => {
  server = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', String(port)],
    {
      cwd: process.cwd(),
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  )

  server.stdout.on('data', (chunk) => { serverOutput += chunk })
  server.stderr.on('data', (chunk) => { serverOutput += chunk })

  await waitForServer()
}, { timeout: 65_000 })

after(async () => {
  if (!server || server.exitCode !== null) return
  server.kill('SIGTERM')
  await Promise.race([
    once(server, 'exit'),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ])
})

test('the public homepage exposes one consistent, indexable search and social identity', async () => {
  const response = await fetch(localOrigin)
  assert.equal(response.status, 200)
  const html = await response.text()

  assert.match(html, new RegExp(`<title>${expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`))
  const description = metaContent(html, 'name', 'description')
  assert.ok(description.length <= 160, `description is ${description.length} characters`)
  for (const phrase of ['Pirun Kongsaeng', 'Senior Web Developer', 'Bangkok', 'WordPress', 'Shopify', 'Next.js']) {
    assert.ok(description.includes(phrase), `description is missing ${phrase}`)
  }
  assert.equal(new URL(linkHref(html, 'canonical')).href, `${productionOrigin}/`)
  assert.equal(metaContent(html, 'property', 'og:title'), expectedTitle)
  assert.equal(metaContent(html, 'property', 'og:description'), description)
  assert.equal(new URL(metaContent(html, 'property', 'og:url')).href, `${productionOrigin}/`)
  assert.equal(metaContent(html, 'property', 'og:image'), `${productionOrigin}/images/hero/profile.webp`)
  assert.equal(metaContent(html, 'property', 'og:image:width'), '3024')
  assert.equal(metaContent(html, 'property', 'og:image:height'), '4032')
  assert.equal(metaContent(html, 'name', 'twitter:card'), 'summary_large_image')
  assert.equal(metaContent(html, 'name', 'twitter:title'), expectedTitle)
  assert.equal(metaContent(html, 'name', 'twitter:description'), description)
  assert.equal(metaContent(html, 'name', 'twitter:image'), `${productionOrigin}/images/hero/profile.webp`)

  const robots = metaContent(html, 'name', 'robots')
  assert.match(robots, /\bindex\b/)
  assert.match(robots, /\bfollow\b/)
})

test('the homepage describes the real person and profile in JSON-LD', async () => {
  const response = await fetch(localOrigin)
  const html = await response.text()
  const match = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)
  assert.ok(match, 'missing ProfilePage JSON-LD script')

  const schema = JSON.parse(match[1])
  assert.equal(schema['@context'], 'https://schema.org')
  assert.equal(schema['@type'], 'ProfilePage')
  assert.equal(schema.url, `${productionOrigin}/`)
  assert.equal(schema.mainEntity['@type'], 'Person')
  assert.equal(schema.mainEntity.name, 'Pirun Kongsaeng')
  assert.equal(schema.mainEntity.jobTitle, 'Senior Web Developer')
  assert.equal(schema.mainEntity.address.addressLocality, 'Bangkok')
  assert.deepEqual(schema.mainEntity.sameAs, [
    'https://www.linkedin.com/in/icebergx/',
    'https://github.com/iceBergxDev',
  ])

  for (const technology of ['WordPress', 'WooCommerce', 'Shopify', 'Next.js', 'PHP', 'TypeScript']) {
    assert.ok(schema.mainEntity.knowsAbout.includes(technology), `missing factual technology: ${technology}`)
  }
})

test('robots.txt allows the public site and points crawlers to the production sitemap', async () => {
  const response = await fetch(`${localOrigin}/robots.txt`)
  assert.equal(response.status, 200)
  const body = await response.text()

  assert.match(body, /^User-Agent: \*$/m)
  assert.match(body, /^Allow: \/$/m)
  assert.match(body, new RegExp(`^Sitemap: ${productionOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\/sitemap\\.xml$`, 'm'))
})

test('sitemap.xml uses the production origin and contains every public portfolio route', async () => {
  const response = await fetch(`${localOrigin}/sitemap.xml`)
  assert.equal(response.status, 200)
  const body = await response.text()
  const urls = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])

  assert.equal(new Set(urls).size, urls.length, 'sitemap contains duplicate URLs')
  assert.deepEqual([...urls].sort(), [...expectedSitemapUrls].sort())
})
