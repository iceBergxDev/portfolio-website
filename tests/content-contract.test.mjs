import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { access, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import test from 'node:test'
import ts from 'typescript'
import { createElement } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { renderToStaticMarkup } from 'react-dom/server'
import postcss from 'postcss'

const execFileAsync = promisify(execFile)
const profileUrl = new URL('../content/career-profile.json', import.meta.url)
const homepageSourcePaths = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/AboutSection.tsx',
  'src/components/sections/CapabilitiesSection.tsx',
  'src/components/sections/SkillsMarquee.tsx',
  'src/components/sections/ExperienceSection.tsx',
  'src/components/sections/ContactSection.tsx',
]

async function readProfile() {
  return JSON.parse(await readFile(profileUrl, 'utf8'))
}

test('homepage consumers exclude client names, paused training, AI tools, and stale experience claims', async () => {
  const forbidden = /GATAC|Foley|Expandasign|StoryFilms|Molecules de Fonction|Flip Films|Altalena|Hype Promotions|Newstart Homes|AJ Flooring|View Ningaloo|Will Fitness|HWD|Tartan|Australian Synthetic Lawns|Grind|Der Herr|SoiChat|WeStride|Claude|Cursor|ChatGPT|Copilot|[45]\s*\+\s*years/i

  await Promise.all(homepageSourcePaths.map(async (path) => {
    const source = await readFile(new URL(`../${path}`, import.meta.url), 'utf8')
    const normalizedSource = source.normalize('NFKD').replace(/\p{M}/gu, '')
    assert.doesNotMatch(normalizedSource, forbidden,
      `${path} must not contain client names, paused training, named AI tools, or stale experience claims`)
  }))
})

test('About keeps the approved three-paragraph structure', async () => {
  const source = await readFile(
    new URL('../src/components/sections/AboutSection.tsx', import.meta.url), 'utf8')

  assert.equal((source.match(/<p(?=[\s>])/g) ?? []).length, 3,
    'About must contain exactly three paragraph elements')
  assert.equal((source.match(/<\/p\s*>/g) ?? []).length, 3,
    'About must close all three paragraph elements')
})

test('public profile copy avoids unsupported scope and response-time claims', async () => {
  const about = await readFile(
    new URL('../src/components/sections/AboutSection.tsx', import.meta.url), 'utf8')
  const contact = await readFile(
    new URL('../src/components/sections/ContactSection.tsx', import.meta.url), 'utf8')
  const contactForm = await readFile(
    new URL('../src/components/sections/ContactForm.tsx', import.meta.url), 'utf8')

  assert.match(about, /WordPress, WooCommerce and Shopify/)
  assert.match(about, /Next\.js/)
  assert.match(contact, /I(?:&apos;|’)m based in Bangkok and can work remotely\./)
  assert.doesNotMatch(contact, /remotely worldwide/i)
  assert.match(contactForm, /get back to you as soon as I can/)
  assert.doesNotMatch(contactForm, /within 24 hours/i)
})

test('shared career profile preserves the approved positioning', async () => {
  const profile = await readProfile()

  assert.equal(profile.headline, 'Senior Web Developer | WordPress, WooCommerce, Shopify & Next.js')
  assert.equal(profile.summary, 'I build new websites and fix the ones already in use. Most of my work is with WordPress, WooCommerce and Shopify. I also build Next.js applications, connect APIs and work on technical SEO, page speed, testing and deployment.')
  assert.equal(profile.experience[0].role, 'Senior Developer')
  assert.equal(profile.experience[0].company, 'Entelech Digital')
})

test('shared career profile excludes client names, paused training, and stale positioning', async () => {
  const profileText = JSON.stringify(await readProfile()).normalize('NFKD').toLowerCase()
  const forbidden = [
    'GATAC', 'Foley', 'Expandasign', 'StoryFilms', 'Molécules de Fonction',
    'Flip Films', 'Altalena', 'Hype Promotions', 'Newstart Homes', 'AJ Flooring',
    'View Ningaloo', 'Will Fitness', 'HWD', 'Tartan', 'Australian Synthetic Lawns',
    'Grind', 'Der Herr', 'SoiChat', 'WeStride', 'Claude', 'Cursor', 'ChatGPT',
    'Copilot', '5+ years', 'Learning',
  ]

  for (const term of forbidden) {
    assert.equal(profileText.includes(term.normalize('NFKD').toLowerCase()), false,
      `Shared career profile must not contain: ${term}`)
  }
})

test('employment history preserves the approved roles and dates', async () => {
  const profile = await readProfile()

  assert.deepEqual(profile.experience.map(({ role, period }) => ({ role, period })), [
    { role: 'Senior Developer', period: 'February 2026 – Present' },
    { role: 'WordPress Developer', period: 'December 2024 – July 2025' },
    { role: 'UX/UI Designer / WordPress Developer', period: 'May 2024 – November 2024' },
    { role: 'Webmaster / IT Support', period: 'October 2021 – May 2024' },
    { role: 'Aircraft Mechanic', period: 'April 2019 – October 2021' },
  ])
  assert.equal(profile.experience[0].current, true)
  assert.equal(profile.experience.filter(({ current }) => current).length, 1)
  for (const job of profile.experience) {
    assert.ok(job.company.trim())
    assert.ok(job.highlights.length > 0)
    for (const highlight of job.highlights) assert.ok(highlight.trim())
  }
})

test('shared career profile provides the fields required by publishing consumers', async () => {
  const profile = await readProfile()

  assert.deepEqual(profile.capabilities.map(({ title }) => title), [
    'WordPress websites',
    'Online stores',
    'Custom web applications',
    'SEO and performance',
    'Live-site support',
  ])
  for (const capability of profile.capabilities) assert.ok(capability.description.trim())
  assert.equal(profile.skillGroups.length, 5)
  for (const group of profile.skillGroups) {
    assert.ok(group.title.trim())
    assert.ok(group.skills.length > 0)
    for (const skill of group.skills) assert.ok(skill.trim())
  }
  assert.deepEqual(profile.education, [{
    qualification: 'High Vocational Certificate in Aircraft Engine Mechanics',
    institution: 'Naval Rating School',
    period: '2017–2019',
    gpa: '3.66',
  }])
  assert.equal(profile.contact.name, 'Pirun Kongsaeng')
  assert.equal(profile.contact.location, 'Bangkok, Thailand')
  assert.equal(profile.contact.email, 'pirun.ks@gmail.com')
  assert.equal(profile.contact.phone, '+66 84 996 2966')
  assert.equal(profile.contact.portfolio, 'https://pirun-portfolio.vercel.app')
  assert.equal(profile.contact.linkedin, 'https://www.linkedin.com/in/icebergx/')
  assert.equal(profile.contact.github, 'https://github.com/iceBergxDev')
})

async function readSource(path) {
  return readFile(new URL('../' + path, import.meta.url), 'utf8')
}

// Evaluate the real data modules with TypeScript already installed for builds.
// Reject unexpected runtime imports instead of loading anything outside this fixture.
async function loadTsData(path, dependencies = {}) {
  const source = await readSource(path)
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  const loadedModule = { exports: {} }
  const requireDependency = (name) => {
    assert.ok(Object.hasOwn(dependencies, name), 'Unexpected data import: ' + name)
    return dependencies[name]
  }
  new Function('require', 'module', 'exports', compiled)(
    requireDependency, loadedModule, loadedModule.exports)
  return loadedModule.exports
}

async function loadTsxModule(path, dependencies = {}) {
  const source = await readSource(path)
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  const loadedModule = { exports: {} }
  const requireDependency = (name) => {
    assert.ok(Object.hasOwn(dependencies, name), 'Unexpected component import: ' + name)
    return dependencies[name]
  }
  new Function('require', 'module', 'exports', compiled)(
    requireDependency, loadedModule, loadedModule.exports)
  return loadedModule.exports
}

async function renderTsxComponent(path, dependencies = {}) {
  const loadedModule = await loadTsxModule(path, {
    react: await import('react'),
    'react/jsx-runtime': jsxRuntime,
    ...dependencies,
  })
  return renderToStaticMarkup(createElement(loadedModule.default))
}

function defaultExport(value) {
  return { default: value }
}

function PlainLink({ children, ...props }) {
  return createElement('a', props, children)
}

function StaticImage(props) {
  const imageProps = { ...props }
  delete imageProps.unoptimized
  delete imageProps.priority
  return createElement('img', imageProps)
}

function anchorsIn(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
    href: match[1].match(/\bhref="([^"]*)"/)?.[1],
    download: /\bdownload(?:="[^"]*")?(?=\s|$)/.test(match[1]),
    text: match[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
  }))
}

async function readProjectData() {
  const catalogue = await loadTsData('src/data/all-projects.ts')
  const dependencies = { './all-projects': catalogue }
  const studies = await loadTsData('src/data/case-studies.ts', dependencies)
  const featured = await loadTsData('src/data/featured-work.ts', dependencies)
  return { ...catalogue, ...studies, ...featured }
}

test('command palette gates project commands to project routes and keeps global navigation', async () => {
  const source = await readSource('src/components/ui/CommandPalette.tsx')
  assert.match(source, /import\s*\{[^}]*usePathname[^}]*\}\s*from 'next\/navigation'/)
  assert.match(source, /const pathname = usePathname\(\)/)
  const routeGate = source.match(/const isProjectRoute = ([^\n]+)/)
  assert.ok(routeGate, 'Command palette must explicitly gate client labels by route')
  const isProjectRoute = new Function('pathname', 'return ' + routeGate[1])
  for (const pathname of ['/', '/about', '/projects-archive', '/case-study']) {
    assert.equal(isProjectRoute(pathname), false, pathname + ' must show navigation only')
  }
  for (const pathname of ['/projects', '/case-study/gatac', '/case-study/newstart']) {
    assert.equal(isProjectRoute(pathname), true, pathname + ' must allow case studies')
  }

  // Check the actual command-building path returns navigation before it reads project titles.
  const commandBuilder = source.slice(source.indexOf('const commands = useMemo'), source.indexOf('const filtered = useMemo'))
  assert.match(commandBuilder, /if \(!isProjectRoute\) return nav/)
  assert.ok(commandBuilder.indexOf('if (!isProjectRoute) return nav') < commandBuilder.indexOf('projectDetails.map'))
  assert.match(commandBuilder, /return \[\.\.\.nav, \.\.\.projects\]/)
  assert.match(commandBuilder, /\[router, isProjectRoute\]/,
    'Changing routes must recompute commands in the globally mounted palette')
  assert.match(source, /placeholder=\{isProjectRoute \? 'Jump to a section or project…' : 'Jump to a section or page…'\}/)
  for (const id of ['nav-work', 'nav-about', 'nav-experience', 'nav-projects', 'nav-contact']) {
    assert.ok(source.includes("id: '" + id + "'"), 'Preserve global navigation: ' + id)
  }
})

test('project catalogue preserves all 15 approved status and year rows', async () => {
  const { allProjects } = await readProjectData()
  assert.deepEqual(allProjects.map(({ slug, status, year }) => [slug, status, year]), [
    ['gatac', 'Production', '2026'], ['foley', 'Production', '2026'],
    ['expandasign', 'Production', '2026'], ['storyfilms', 'Production', '2026'],
    ['mdf', 'Selected work', '2026'], ['flip-films', 'Live', '2026'],
    ['altalena', 'Production', '2026'], ['hype', 'Production', '2026'],
    ['newstart', 'Local', '2026'], ['aj-flooring', 'Selected work', '2025'],
    ['view-ningaloo', 'Staging', '2026'], ['will-fitness', 'Local', '2026'],
    ['hwd', 'Staging', '2026'], ['tartan', 'Selected work', '2026'],
    ['asl', 'Selected work', '2025'],
  ])
})

test('all 15 projects resolve to internal details while nine remain full case studies', async () => {
  const { allProjects, caseStudies, projectDetails, getProjectDetailBySlug } = await readProjectData()
  const fullSlugs = ['gatac', 'foley', 'expandasign', 'storyfilms', 'mdf', 'flip-films', 'altalena', 'hype', 'newstart']
  const cardSlugs = ['aj-flooring', 'view-ningaloo', 'will-fitness', 'hwd', 'tartan', 'asl']
  const allSlugs = [...fullSlugs, ...cardSlugs]
  assert.deepEqual(caseStudies.map(({ slug }) => slug), fullSlugs)
  assert.deepEqual(projectDetails.map(({ slug }) => slug), allProjects.map(({ slug }) => slug))
  assert.deepEqual(allProjects.filter(({ hasCaseStudy }) => hasCaseStudy).map(({ slug }) => slug), fullSlugs)
  assert.deepEqual(allProjects.filter(({ hasCaseStudy }) => !hasCaseStudy).map(({ slug }) => slug), cardSlugs)
  for (const slug of allSlugs) assert.equal(getProjectDetailBySlug(slug)?.slug, slug)
  assert.equal(getProjectDetailBySlug('missing'), undefined)
})

test('featured work preserves the approved four-project order', async () => {
  const { featuredWork } = await readProjectData()
  assert.deepEqual(featuredWork.map(({ slug }) => slug), ['gatac', 'storyfilms', 'mdf', 'foley'])
})

test('full case studies retain required evidence fields and material boundaries', async () => {
  const { caseStudies } = await readProjectData()
  const boundaries = {
    gatac: /EU and UK work is not live/,
    foley: /Time saved, incident reduction.*not measured/,
    expandasign: /import was not applied.*not a production result/,
    storyfilms: /not a site-wide speed score.*every later plugin change/,
    mdf: /sender recovery and broad performance improvement were not verified/,
    'flip-films': /within test variance.*No score target/,
    altalena: /160 checks cover only the fixes described here/,
    hype: /redesign remained local and was not deployed/,
    newstart: /current build is local.*not verified a live launch/,
  }
  for (const cs of caseStudies) {
    for (const field of ['challenge', 'responsibility', 'solution', 'verification', 'result', 'boundary']) {
      assert.ok(typeof cs[field] === 'string' && cs[field].trim(), cs.slug + ': ' + field)
    }
    assert.match(cs.boundary, boundaries[cs.slug], cs.slug + ': material boundary')
    assert.ok(cs.tags.length > 0, cs.slug + ': technologies')
    assert.equal(cs.liveUrl, undefined, cs.slug + ': no unaudited live-site link')
  }
})

test('all project cards use authentic raster covers with descriptive presentation metadata', async () => {
  const { allProjects, projectDetails } = await readProjectData()
  assert.equal(allProjects.find(({ slug }) => slug === 'mdf')?.title, 'MDF Beauty')
  assert.equal(projectDetails.find(({ slug }) => slug === 'mdf')?.client, 'MDF Beauty')
  for (const { slug, coverImage, coverAlt, coverPosition } of allProjects) {
    assert.doesNotMatch(coverImage, /\.svg$/i, slug + ': cards must use authentic raster artwork')
    await access(new URL('../public' + coverImage, import.meta.url))
    assert.ok(typeof coverAlt === 'string' && coverAlt.trim().length >= (slug === 'gatac' ? 8 : 20),
      slug + ': coverAlt must describe the project image')
    if (coverPosition !== undefined) {
      assert.match(coverPosition, /^(?:left|center|right|\d+%) (?:top|center|bottom|\d+%)$/,
        slug + ': coverPosition must be a two-axis object position')
    }
  }
})

test('GATAC uses its logo on cards and a safe product screen on its own page', async () => {
  const { allProjects, projectDetails } = await readProjectData()
  const card = allProjects.find(({ slug }) => slug === 'gatac')
  const detail = projectDetails.find(({ slug }) => slug === 'gatac')

  assert.equal(card?.coverImage, '/images/projects/gatac/logo.png')
  assert.equal(card?.coverFit, 'contain')
  assert.equal(detail?.heroImage, '/images/projects/gatac/cover.png')
  assert.equal(detail?.heroAspect, 'wide')
  assert.notEqual(detail?.heroImage, detail?.coverImage)
  assert.doesNotMatch(JSON.stringify({ card, detail }), /app-screenshot\.png|app-draft\.png/)
})

test('MDF case-study media uses clean captures without cookie or preview chrome', async () => {
  const { projectDetails } = await readProjectData()
  const detail = projectDetails.find(({ slug }) => slug === 'mdf')
  const features = detail?.features ?? []

  assert.equal(features[0]?.image, '/images/projects/mdf/live-homepage.png')
  assert.equal(features[1]?.image, '/images/projects/mdf/live-journal.png')
  assert.equal(features[2]?.title, 'Email signup flow')
  assert.equal(features[2]?.image, '/images/projects/mdf/live-signup.png')
  for (const feature of features) await access(new URL('../public' + feature.image, import.meta.url))
  assert.doesNotMatch(JSON.stringify(detail), /feat-hero\.jpg|feat-products\.jpg|feat-popup\.jpg/)
})

test('AJ Flooring case-study media uses the reviewed homepage and service captures', async () => {
  const { projectDetails } = await readProjectData()
  const detail = projectDetails.find(({ slug }) => slug === 'aj-flooring')
  const features = detail?.features ?? []

  assert.equal(detail?.heroImage, '/images/projects/aj-flooring/hero.jpg')
  assert.equal(features[0]?.image, '/images/projects/aj-flooring/services.jpg')
  assert.equal(features[1]?.image, '/images/projects/aj-flooring/features.jpg')
  for (const image of [detail?.heroImage, ...features.map((feature) => feature.image)]) {
    assert.ok(image)
    await access(new URL('../public' + image, import.meta.url))
  }
  assert.doesNotMatch(JSON.stringify(detail), /prod-awards\.jpg/)
})

test('homepage hero uses the approved plain-language positioning and direct actions', async () => {
  const source = await readSource('src/components/sections/HeroSection.tsx')
  assert.match(source, />Senior Web Developer in Bangkok</)
  assert.match(source, /I build new websites and fix the ones already in use\./)
  assert.match(source, /Most of my work is with WordPress, WooCommerce and Shopify\./)
  assert.match(source, /I also build Next\.js applications, connect APIs and work on technical SEO and page speed\./)
  assert.match(source, />\s*See my work\s*</)
  assert.doesNotMatch(source, /Typewriter|POSITIONING|TAGLINE|systems behind them|post-launch support/i)
})

test('case-study headings use plain labels instead of audit language', async () => {
  const source = await readSource('src/app/case-study/[slug]/page.tsx')
  for (const label of [
    'What was needed', 'What I worked on', 'What I changed',
    'How I checked it', 'Where it stands', 'Limits', 'How it works',
  ]) assert.ok(source.includes(label), `Missing case-study label: ${label}`)
  assert.doesNotMatch(source, /What I owned|Result I can prove|Scope I will not overclaim|Inside the work/)
})

test('case-study screenshot media bypasses image optimization to keep navigation stable', async () => {
  const source = await readSource('src/app/case-study/[slug]/page.tsx')
  const imageBlocks = [...source.matchAll(/<Image[\s\S]*?\/>/g)].map(([block]) => block)
  const caseStudyImages = imageBlocks.filter((block) => (
    block.includes('cs.heroImage') || block.includes('feature.image')
  ))

  assert.ok(caseStudyImages.length >= 2, 'case studies should render hero and feature media')
  for (const block of caseStudyImages) {
    assert.match(block, /\bunoptimized\b/)
  }
})

test('contact fields expose browser-friendly autocomplete hints', async () => {
  const source = await readSource('src/components/sections/ContactForm.tsx')
  assert.match(source, /name="name"[^>]*autoComplete="name"/)
  assert.match(source, /name="email"[^>]*autoComplete="email"/)
})

test('published resume PDF exists and begins with the PDF signature', async () => {
  const pdf = await readFile(
    new URL('../public/Pirun-Kongsaeng-Resume.pdf', import.meta.url))

  assert.ok(pdf.length >= 5, 'Published resume PDF must not be empty')
  assert.equal(pdf.subarray(0, 5).toString('ascii'), '%PDF-')
})

test('published resume PDF text matches the current reviewed resume profile', async () => {
  const profile = await readProfile()
  const { stdout } = await execFileAsync('pdftotext', [
    fileURLToPath(new URL('../public/Pirun-Kongsaeng-Resume.pdf', import.meta.url)),
    '-',
  ])
  const text = stdout
    .replace(/-\s*\n\s*(?=\p{Ll})/gu, '-')
    .replace(/\s+/g, ' ')
    .trim()
  const wordsAndPunctuation = (value) => value.replace(/[\s-]+/g, '')
  const compactText = wordsAndPunctuation(text)

  assert.ok(text.includes(profile.contact.portfolio))
  for (const job of profile.experience) {
    for (const highlight of job.resumeHighlights) {
      assert.ok(compactText.includes(wordsAndPunctuation(highlight)),
        `${job.company}: reviewed resume highlight is missing from the published PDF`)
    }
  }
  for (const group of profile.skillGroups) {
    const expected = `${group.title}: ${group.skills.join(', ')}`
    assert.ok(compactText.includes(wordsAndPunctuation(expected)),
      `${group.title}: reviewed skill group is missing from the published PDF`)
  }
  for (const educationFact of [
    'Bachelor of Engineering in Refrigeration and Air Conditioning (Incomplete)',
    '2015-2017 - Completed 2 years',
    'Pre-Mechanical Engineering Program',
    '2012-2015',
  ]) {
    assert.ok(compactText.includes(wordsAndPunctuation(educationFact)),
      `Published PDF is missing education fact: ${educationFact}`)
  }
  assert.doesNotMatch(text, /Repeatable QA|Deployment verification/)
  assertResumePrivacy(text, profile)
})

test('Header renders one readable Resume route link in desktop and mobile navigation', async () => {
  const html = await renderTsxComponent('src/components/layout/Header.tsx', {
    'next/link': defaultExport(PlainLink),
  })
  const navigation = [...html.matchAll(/<nav\b[\s\S]*?<\/nav>/g)].map((match) => match[0])

  assert.equal(navigation.length, 2, 'Header must retain desktop and mobile navigation')
  assert.match(navigation[0], /class="hidden md:flex\b/, 'First navigation must remain desktop-only')
  assert.match(html, /class="[^"]*\bmd:hidden\b[^"]*"/, 'Header must retain a mobile-only drawer')
  for (const [index, markup] of navigation.entries()) {
    const resumeLinks = anchorsIn(markup)
      .filter(({ href, text }) => href === '/resume' && text === 'Resume')
    assert.equal(resumeLinks.length, 1,
      `${index === 0 ? 'Desktop' : 'Mobile'} navigation must expose one Resume route link`)
  }
})

test('Footer links to the web resume while Contact preserves direct email', async () => {
  const footer = await renderTsxComponent('src/components/layout/Footer.tsx', {
    'next/image': defaultExport(StaticImage),
    'next/link': defaultExport(PlainLink),
  })
  const contact = await renderTsxComponent('src/components/sections/ContactSection.tsx', {
    'next/image': defaultExport(StaticImage),
    '@/components/sections/ContactForm': defaultExport(() => createElement('form')),
  })
  assert.deepEqual(anchorsIn(footer).filter(({ href }) => href === '/resume'), [{
    href: '/resume',
    download: false,
    text: 'Resume',
  }])
  assert.equal(anchorsIn(footer).some(({ href }) => href === '/Pirun-Kongsaeng-Resume.pdf'), false)
  assert.equal(anchorsIn(contact).some(({ href }) => href === '/Pirun-Kongsaeng-Resume.pdf'), false)
  assert.ok(anchorsIn(contact).some(({ href }) => href === 'mailto:pirun.ks@gmail.com'),
    'Removing the resume download must not remove direct email contact')
})

test('portfolio surfaces do not expose a resume PDF download', async () => {
  const sourceFiles = [
    ['hero', await readSource('src/components/sections/HeroSection.tsx')],
    ['contact', await readSource('src/components/sections/ContactSection.tsx')],
    ['footer', await readSource('src/components/layout/Footer.tsx')],
  ]
  for (const [name, source] of sourceFiles) {
    assert.equal(source.includes('/Pirun-Kongsaeng-Resume.pdf'), false,
      `${name}: the website must not offer the resume PDF`)
    assert.doesNotMatch(source, /Download resume/i,
      `${name}: the website must not show a resume download call to action`)
  }
})

test('root metadata uses the production portfolio identity', async () => {
  const profile = await readProfile()
  const layout = await loadTsxModule('src/app/layout.tsx', {
    'react/jsx-runtime': jsxRuntime,
    'next/font/google': { Inter: () => ({ variable: '--font-inter' }) },
    'framer-motion': { MotionConfig: ({ children }) => children },
    './globals.css': {},
    '@/components/layout/Header': defaultExport(() => null),
    '@/components/layout/Footer': defaultExport(() => null),
    '@/components/ui/CommandPalette': defaultExport(() => null),
    '@/data/career-profile': { careerProfile: profile },
  })

  assert.ok(layout.metadata.metadataBase instanceof URL)
  assert.equal(layout.metadata.metadataBase.href, profile.contact.portfolio + '/')
  assert.equal(layout.metadata.title, `Senior Web Developer in Bangkok | ${profile.contact.name}`)
  assert.equal(layout.metadata.description, 'Portfolio of Pirun Kongsaeng, a Senior Web Developer in Bangkok working with WordPress, WooCommerce, Shopify, Next.js, API integrations, SEO, and performance.')
  assert.deepEqual(layout.metadata.openGraph.images, [{
    url: '/images/hero/profile.webp',
    width: 3024,
    height: 4032,
    alt: 'Pirun Kongsaeng, Senior Web Developer in Bangkok',
  }])
})

const resumeForbidden = /GATAC|Foley|Expandasign|StoryFilms|Molecules de Fonction|Flip Films|Altalena|Hype Promotions|Newstart Homes|AJ Flooring|View Ningaloo|Will Fitness|HWD|Tartan|Australian Synthetic Lawns|Grind|Der Herr|SoiChat|WeStride|Claude|Cursor|ChatGPT|Copilot|[45]\s*\+\s*years|\bLearning\b|\bHonors\b|street address|localhost|127\.0\.0\.1|ssh|cpanel|credential|exploit|exposed backup|\binfrastructure\b/i

function assertResumePrivacy(text, profile) {
  assert.doesNotMatch(text.normalize('NFKD').replace(/\p{M}/gu, ''), resumeForbidden)
  const approvedUrls = [profile.contact.portfolio, profile.contact.linkedin, profile.contact.github]
  const withoutPersonalUrls = text.replace(/(?:https?:\/\/|www\.)[^\s<>"'`]+/gi,
    (url) => approvedUrls.includes(url) ? '' : url)
  const withoutApprovedEmail = withoutPersonalUrls.replace(/[\w.+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,63}/gi,
    (email) => email === profile.contact.email ? '' : email)
  const withoutDottedTechnology = withoutApprovedEmail.replace(/(?<![\w./-])Next\.js\b/g, '')
  assert.doesNotMatch(withoutDottedTechnology, /https?:\/\/|www\.|\b(?:[a-z0-9-]+\.)+[a-z]{2,63}\b/i,
    'Resume text must not contain unapproved URLs or bare domains')
}

test('resume route consumes the shared profile and renders privacy-safe public text', async () => {
  const source = await readSource('src/app/resume/page.tsx')
  assert.match(source, /import\s*\{\s*careerProfile\s*\}\s*from ['"]@\/data\/career-profile['"]/)
  assert.match(source, /careerProfile\.(?:contact|headline|experience)/)
  assert.match(source, /import ['"]\.\/resume\.css['"]/)
  assert.doesNotMatch(source.normalize('NFKD').replace(/\p{M}/gu, ''), resumeForbidden)
  const { html } = await renderResume()
  assertResumePrivacy(resumeText(html), await readProfile())
  assert.match(source, /job\.resumeHighlights\.map\(/)
  assert.doesNotMatch(source, /\.slice\(/)
})

test('every job declares a reviewed resume selection drawn from its approved highlights', async () => {
  const profile = await readProfile()
  for (const job of profile.experience) {
    assert.ok(Array.isArray(job.resumeHighlights) && job.resumeHighlights.length > 0,
      job.company + ' must declare non-empty resumeHighlights')
    assert.equal(job.resumeHighlights.length, [5, 4, 3, 3, 2][profile.experience.indexOf(job)],
      job.company + ': keep the approved resume detail balance')
    for (const highlight of job.resumeHighlights) {
      assert.ok(job.highlights.includes(highlight), job.company + ': selected highlight must already be approved')
      assertResumePrivacy(highlight, profile)
    }
  }
})

async function renderResume(profile = undefined) {
  const source = await readSource('src/app/resume/page.tsx')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  const dependencies = {
    'react/jsx-runtime': jsxRuntime,
    'next/image': defaultExport(StaticImage),
    '@/data/career-profile': await loadTsData('src/data/career-profile.ts', {
      '../../content/career-profile.json': { default: profile ?? await readProfile() },
    }),
    './resume.css': {},
  }
  const loadedModule = { exports: {} }
  new Function('require', 'module', 'exports', compiled)((name) => {
    assert.ok(Object.hasOwn(dependencies, name), 'Unexpected resume import: ' + name)
    return dependencies[name]
  }, loadedModule, loadedModule.exports)
  return {
    html: renderToStaticMarkup(createElement(loadedModule.exports.default)),
    metadata: loadedModule.exports.metadata,
  }
}

function resumeText(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
}

test('rendered resume retains ordered career facts, readable contacts, and privacy-safe selectable text', async () => {
  const { html, metadata } = await renderResume()
  const profile = await readProfile()
  const text = resumeText(html)
  assert.equal(metadata.title, 'Pirun Kongsaeng - Resume')
  assert.equal(metadata.description, 'I’m a Senior Web Developer based in Bangkok with nearly five years of experience across WordPress, WooCommerce, Shopify and Next.js. I build new sites, improve existing ones and support live ecommerce systems. My work includes custom themes and plugins, API integrations, technical SEO, performance, testing and deployment.')
  assert.match(html, /<article\b[^>]*class="[^"]*resume-page/)
  assert.match(html, /<div\b[^>]*class="[^"]*resume-main/)
  assert.match(html, /<aside\b[^>]*class="[^"]*resume-sidebar/)
  assert.match(html, /<img\b[^>]*class="[^"]*resume-portrait/)
  assert.match(html, /<img\b[^>]*alt="Pirun Kongsaeng"/)
  assert.match(html, /<header\b/)
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
  assert.equal((html.match(/<section\b/g) ?? []).length, 7)
  assert.deepEqual([...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map((match) => resumeText(match[1])), [
    'Professional Experience', 'Core Capabilities', 'Contact', 'About Me',
    'Technical Skills', 'Education', 'Languages',
  ])
  assert.ok(text.includes(profile.headline))
  for (const value of Object.values(profile.contact)) assert.ok(text.includes(value), 'Visible contact: ' + value)
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g)]
  assert.deepEqual(links.map((match) => match[1]).sort(), [
    'tel:+66849962966', 'mailto:pirun.ks@gmail.com',
    profile.contact.portfolio, profile.contact.linkedin, profile.contact.github,
  ].sort(), 'Only approved personal contact destinations belong on the resume')
  for (const match of links.filter((link) => link[1].startsWith('https:'))) {
    assert.equal(resumeText(match[2]), match[1], 'Print must preserve full personal URLs')
  }
  assert.match(text, /nearly five years of experience/)
  assert.equal(text.includes(profile.summary), false, 'Write a resume-specific summary')
  for (const capability of profile.capabilities) {
    assert.ok(text.includes(capability.title))
    assert.ok(text.includes(capability.description))
  }
  let previousPosition = -1
  for (const job of profile.experience) {
    const position = text.indexOf(job.company)
    assert.ok(position > previousPosition, 'Preserve newest-first employment order: ' + job.company)
    previousPosition = position
    assert.ok(text.includes(job.role))
    assert.ok(text.includes(job.period.replace(/[–—]/g, '-')))
    assert.ok(job.highlights.some((highlight) => text.includes(highlight)), 'Retain a responsibility: ' + job.company)
    for (const highlight of job.resumeHighlights) assert.ok(text.includes(highlight))
  }
  for (const group of profile.skillGroups) {
    assert.ok(text.includes(group.title))
    for (const skill of group.skills) assert.ok(text.includes(skill))
  }
  assert.ok(text.includes(profile.education[0].qualification))
  assert.ok(text.includes(profile.education[0].institution))
  assert.ok(text.includes(profile.education[0].period.replace(/[–—]/g, '-')))
  assert.ok(text.includes('Thai (Native)'))
  assert.ok(text.includes('English (Working proficiency)'))
  assert.doesNotMatch(text, /[‐‑‒–—―]/u, 'Resume must use simple ASCII hyphens')
  assertResumePrivacy(text, profile)
  assert.doesNotMatch(html, /<(?:table|canvas|button|input)\b|\d+\s*%/i)
})

test('resume never promotes unreviewed full-history highlights into its selected content', async () => {
  const profile = await readProfile()
  const before = await renderResume(profile)
  for (const job of profile.experience) {
    job.highlights = [
      'Maintained server infrastructure at https://client-only.example/ and www.client-only.example.',
      ...job.highlights.toReversed(),
    ]
  }
  const after = await renderResume(profile)
  assertResumePrivacy(resumeText(after.html), profile)
  assert.equal(after.html, before.html, 'Changing full-history order or content must not change reviewed resume selections')
})

test('resume privacy rejects unfamiliar URL text and infrastructure wording', async () => {
  const profile = await readProfile()
  assert.doesNotThrow(() => assertResumePrivacy(Object.values(profile.contact).join(' '), profile))
  assert.doesNotThrow(() => assertResumePrivacy('Builds with Next.js', profile))
  for (const text of [
    'https://unlisted-client.example/path', 'http://unlisted-client.example/path',
    'www.unlisted-client.example', 'unlisted-client.example/path', 'unlisted-client.example',
    'unlisted-client.js', 'Next.js.unlisted-client.example', 'pirun.ks@gmail.com.unlisted-client.example',
    profile.contact.github + '/private-project', 'Maintained infrastructure', 'Maintained server infrastructure',
  ]) {
    assert.throws(() => assertResumePrivacy(text, profile), { code: 'ERR_ASSERTION' }, text)
  }
})

test('resume stylesheet restores the approved two-column A4 design and hides global chrome', async () => {
  const css = postcss.parse(await readSource('src/app/resume/resume.css'))
  const pages = []
  css.walkAtRules('page', (rule) => pages.push(rule))
  assert.equal(pages.length, 1)
  assert.equal(pages[0].params, 'resume', 'Keep the named page rule bound to the resume')
  const declarations = (rule) => Object.fromEntries(rule.nodes
    .filter((node) => node.type === 'decl').map(({ prop, value }) => [prop, value]))
  assert.equal(declarations(pages[0]).size, 'A4')
  assert.equal(declarations(pages[0]).margin, '0')
  const baseRule = css.nodes.find((node) => node.type === 'rule' && node.selectors.includes('.resume-page'))
  const baseSheet = declarations(baseRule)
  assert.equal(baseSheet.display, 'grid')
  assert.match(baseSheet['grid-template-columns'], /^\d+(?:\.\d+)?mm minmax\(0, 1fr\)$/)
  assert.equal(baseSheet['min-height'], '297mm')
  const sidebarRule = css.nodes.find((node) => node.type === 'rule' && node.selectors.includes('.resume-page .resume-sidebar'))
  const sidebar = declarations(sidebarRule)
  assert.match(sidebar.background, /^#[0-9a-f]{6}$/i)
  assert.equal(sidebar.color, '#fff')
  const portraitRule = css.nodes.find((node) => node.type === 'rule' && node.selectors.includes('.resume-page .resume-portrait'))
  assert.equal(declarations(portraitRule)['border-radius'], '50%')
  const print = css.nodes.find((node) => node.type === 'atrule' && node.name === 'media' && node.params === 'print')
  assert.ok(print, 'Print styles are required')
  const ruleFor = (selector) => print.nodes.find((node) => node.type === 'rule' && node.selectors.includes(selector))
  const sheet = declarations(ruleFor('.resume-page'))
  assert.equal(sheet.page, 'resume')
  assert.equal(declarations(ruleFor('body:has(.resume-page)')).page, 'resume',
    'A resume-present print ancestor must bind the same named page')
  assert.ok(/^\d+(?:\.\d+)?pt$/.test(sheet['font-size']))
  assert.ok(parseFloat(sheet['font-size']) >= 8, 'Printed body content must remain readable')
  assert.equal(sheet.color, '#354052')
  assert.equal(sheet.background, '#fff')
  assert.equal(sheet.padding, '0')
  assert.equal(sheet['box-shadow'], 'none')
  assert.equal(sheet['print-color-adjust'], 'exact')
  assert.equal(declarations(ruleFor('body:has(.resume-page) > :not(main)')).display, 'none',
    'Hide the global header, footer, mobile drawer and command palette outside main')
  assert.equal(declarations(ruleFor('.resume-page a[href]::after')).content, 'none')
  assert.equal(declarations(ruleFor('.resume-page .resume-job'))['break-inside'], 'avoid')
  css.walkRules((rule) => {
    assert.ok(rule.selectors.every((selector) => selector.includes('.resume-page')), 'Keep selectors route-scoped: ' + rule.selector)
  })
  css.walkDecls('font-size', ({ value }) => {
    if (value.endsWith('pt')) assert.ok(parseFloat(value) >= 8, 'No text below 8pt')
  })
})

const linkedInStyleForbidden = /results[- ]driven|passionate|leverag(?:e|ed|ing)|spearheaded|cutting[- ]edge|dynamic professional|proven track record|fast[- ]paced|innovative solutions|seamless|robust|utiliz(?:e|ed|ing)|AI[- ](?:powered|assisted|generated)|\bAI tools?\b|\b(?:Gemini|Codex|OpenAI|Anthropic)\b|optimi[sz]ed for recruiters|generated for recruiters|—|\p{Extended_Pictographic}/iu

function assertLinkedInPrivacy(text) {
  // LinkedIn fields allow no URLs, including the personal links allowed on the resume.
  assertResumePrivacy(text, { contact: {} })
  assert.doesNotMatch(text, linkedInStyleForbidden)
  assert.doesNotMatch(text, /Story\s+Films|\b(?:Australian|Australia|UK|United Kingdom|international clients)\b|\d+\s*%|\b\d+[- ]second\b/i)
}

async function readLinkedInSections() {
  const source = await readSource('content/linkedin-profile.md')
  assert.equal(source.split('\n')[0], '# LinkedIn Profile Copy')
  assert.deepEqual([...source.matchAll(/^## (.+)$/gm)].map((match) => match[1]), [
    'Headline', 'About', 'Experience', 'Priority Skills',
  ])
  const sections = Object.fromEntries([...source.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)]
    .map((match) => [match[1], match[2].trim()]))
  return { source, sections }
}

test('LinkedIn draft has the exact headline and first-person About paragraphs', async () => {
  const { sections } = await readLinkedInSections()
  assert.equal(sections.Headline, 'Senior Web Developer | WordPress, WooCommerce, Shopify & Next.js')
  const paragraphs = sections.About.split(/\n\s*\n/)
  assert.equal(paragraphs.length, 4)
  for (const paragraph of paragraphs) {
    assert.match(paragraph, /\b(?:I|my)\b/i)
    assert.ok(paragraph.split(/\s+/).length <= 65, 'Keep About paragraphs short')
    assert.doesNotMatch(paragraph, /^[#•*-]/m, 'About must be ordinary paragraphs')
  }
  assert.match(paragraphs[0], /new website needs building/i)
  assert.match(paragraphs[0], /live one needs fixing/i)
  for (const term of ['WordPress', 'WooCommerce', 'Shopify', 'Next.js', 'API']) {
    assert.ok(sections.About.includes(term), 'Explain the range of work: ' + term)
  }
  assert.match(paragraphs[2], /aircraft maintenance/i)
  assert.match(paragraphs[2], /test|check|inspect/i)
  assert.match(paragraphs[3], /Bangkok/)
  assert.match(paragraphs[3], /open to senior web development roles/i)
  const profile = await readProfile()
  const { html } = await renderResume()
  const normalize = (value) => value.replace(/\s+/g, ' ').trim()
  assert.equal(normalize(sections.About).includes(normalize(profile.summary)), false)
  for (const paragraph of paragraphs) {
    assert.equal(resumeText(html).includes(normalize(paragraph)), false, 'Do not copy the resume summary')
    assert.equal(normalize(profile.summary).includes(normalize(paragraph)), false, 'Write LinkedIn-specific copy')
  }
})

test('LinkedIn preserves five employer records, approved role facts, and concrete description counts', async () => {
  const { sections } = await readLinkedInSections()
  const roles = [...sections.Experience.matchAll(/^### (.+)\n([\s\S]*?)(?=^### |$(?![\s\S]))/gm)]
  const companies = [
    'Entelech Thailand', 'Geekster Digital', 'TMES Company Limited',
    'Thai Maritime Enforcement Command Center', 'Royal Thai Naval Air Division',
  ]
  assert.deepEqual(roles.map((match) => match[1]), companies)
  const profile = await readProfile()
  for (const [index, role] of roles.entries()) {
    const fields = role[2].match(/^\s*Title: (.+)\n\nCompany action: (.+)\n\nDates: (.+)\n\nDescription:\n\n([\s\S]+?)\s*$/)
    assert.ok(fields, companies[index] + ': require all four labeled fields')
    assert.equal(fields[1], profile.experience[index].role)
    assert.equal(fields[3], profile.experience[index].period)
    const action = index < 3 ? 'Keep the existing linked employer: '
      : index === 3 ? 'Keep the existing employer: ' : 'Correct the typed employer name to '
    assert.equal(fields[2], action + companies[index] + '.')
    const bullets = fields[4].split('\n')
    assert.equal(bullets.length, [5, 4, 3, 3, 2][index])
    for (const bullet of bullets) assert.match(bullet, /^• \S.+/)
  }
})

test('LinkedIn priority skills preserve the approved order', async () => {
  const { sections } = await readLinkedInSections()
  assert.deepEqual(sections['Priority Skills'].split('\n'), [
    'WordPress', 'WooCommerce', 'Shopify', 'Next.js', 'PHP', 'JavaScript',
    'TypeScript', 'API Integration', 'Web Performance', 'Technical SEO', 'Git',
  ].map((skill, index) => `${index + 1}. ${skill}`))
})

test('LinkedIn draft excludes client disclosures, stale copy, named AI tools, and synthetic phrasing', async () => {
  const { source } = await readLinkedInSections()
  assertLinkedInPrivacy(source)
  assert.doesNotMatch(source, /(^|\s)#[\p{L}\p{N}_]+/u, 'No hashtags')
})

test('LinkedIn privacy and voice guard rejects known disclosures and unfamiliar domains', () => {
  assert.doesNotThrow(() => assertLinkedInPrivacy('I build Next.js applications in Bangkok.'))
  for (const text of [
    'GATAC', 'Foley', 'Expandasign', 'StoryFilms', 'Story Films', 'Molécules de Fonction',
    'Flip Films', 'Altalena', 'Hype Promotions', 'Newstart Homes', 'AJ Flooring',
    'View Ningaloo', 'Will Fitness', 'HWD', 'Tartan', 'Australian Synthetic Lawns',
    'Grind', 'Der Herr', 'SoiChat', 'WeStride', '5+ years', 'Learning',
    'Claude', 'Cursor', 'ChatGPT', 'Copilot', 'Gemini', 'Codex', 'OpenAI', 'Anthropic',
    'https://client.example', 'client.example', 'www.client.example',
    'https://github.com/iceBergxDev', 'localhost', 'ssh', 'infrastructure', 'exposed backup',
    'results-driven', 'passionate', 'leveraged', 'spearheaded', 'cutting-edge',
    'dynamic professional', 'proven track record', 'fast-paced', 'innovative solutions',
    'seamless', 'robust', 'utilize', 'AI-assisted coding', 'AI tools',
    'optimized for recruiters', 'Australian clients', 'UK clients', '20%', '2-second',
  ]) {
    assert.throws(() => assertLinkedInPrivacy(text), { code: 'ERR_ASSERTION' }, text)
  }
})

// Reviewed against career-profile.json and approved in LinkedIn Draft Task 1.
// Content changes require evidence review and an explicit update to these values.
const approvedLinkedInAbout = [
  'Most of my work starts with one of two things: a new website needs building, or a live one needs fixing.',
  'I’ve worked in web development for nearly five years, mainly with WordPress, WooCommerce and Shopify. I also build with Next.js and connect websites to other systems through APIs. Recent work includes a Shopify-connected ordering portal, custom WordPress tools, ecommerce fixes, technical SEO and page-speed work.',
  'Before this, I worked in aircraft maintenance. It taught me to inspect first, trace a problem properly and check the result before signing off. I still work that way on live websites.',
  'I’m based in Bangkok and open to senior web development roles.',
]

const approvedLinkedInDescriptions = {
  'Entelech Thailand / Senior Developer': [
    '• Built a Next.js ordering portal connected to Shopify, with customer account access, draft orders and live store data.',
    '• Build WordPress and PHP tools for inspection forms, pricing checks and other day-to-day work.',
    '• Fix WooCommerce catalogue, quotation and product-data issues on live sites.',
    '• Prepare backups, rollback steps and release checks before changing live websites.',
    '• Set up analytics, review technical SEO issues and test important customer journeys.',
  ],
  'Geekster Digital / WordPress Developer': [
    '• Built WordPress websites, WooCommerce stores and custom themes for retail and service businesses.',
    '• Connected WooCommerce to inventory data and automated follow-up emails.',
    '• Set up Google Tag Manager, Google Analytics 4 and Search Console for site tracking and SEO checks.',
    '• Built multilingual WordPress sites with WPML and Polylang.',
  ],
  'TMES Company Limited / UX/UI Designer / WordPress Developer': [
    '• Designed page layouts, signup and purchase flows, and contact forms in Figma.',
    '• Turned approved designs into responsive WordPress pages with Elementor Pro.',
    '• Worked through briefs, revisions and handoff details with the team before launch.',
  ],
  'Thai Maritime Enforcement Command Center / Webmaster / IT Support': [
    "• Maintained the organisation's WordPress website, including content, software updates and routine security checks.",
    '• Updated website content and structure to support government ITA compliance requirements.',
    '• Handled software troubleshooting, system maintenance and video-conferencing support for internal teams.',
  ],
  'Royal Thai Naval Air Division / Aircraft Mechanic': [
    '• Inspected, maintained and repaired helicopter engines, gearboxes and related electrical and instrumentation components.',
    '• Followed technical manuals, checklists and handover routines where accuracy mattered.',
  ],
}

function assertApprovedLinkedInClaims(sections) {
  assert.deepEqual(sections.About.split(/\n\s*\n/), approvedLinkedInAbout,
    'About changes require approval against career evidence')
  const roles = [...sections.Experience.matchAll(/^### (.+)\n([\s\S]*?)(?=^### |$(?![\s\S]))/gm)]
  const actual = roles.map(([, company, body]) => {
    const title = body.match(/^Title: (.+)$/m)?.[1]
    const description = body.match(/^Description:\n\n([\s\S]*)/m)?.[1].trim()
    assert.ok(description, company + ': description is required')
    return [company + ' / ' + title, description.split('\n')]
  })
  assert.deepEqual(actual, Object.entries(approvedLinkedInDescriptions),
    'Every experience bullet must retain its approved wording and employer/role association')
}

test('LinkedIn About and every experience description retain the approved evidenced copy', async () => {
  const { sections } = await readLinkedInSections()
  assertApprovedLinkedInClaims(sections)
})

test('LinkedIn evidence guard rejects invented claims even when privacy and bullet counts pass', async () => {
  const { sections } = await readLinkedInSections()
  const unsupportedClaim = 'I managed the entire engineering department.'
  assert.doesNotThrow(() => assertLinkedInPrivacy(unsupportedClaim))
  for (const paragraph of approvedLinkedInAbout) {
    const altered = { ...sections, About: sections.About.replace(paragraph, paragraph + ' ' + unsupportedClaim) }
    assert.equal(altered.About.split(/\n\s*\n/).length, 4)
    assert.throws(() => assertApprovedLinkedInClaims(altered), { code: 'ERR_ASSERTION' })
  }
  for (const [role, bullets] of Object.entries(approvedLinkedInDescriptions)) {
    for (const bullet of bullets) {
      const altered = { ...sections, Experience: sections.Experience.replace(bullet, '• ' + unsupportedClaim) }
      assert.equal((altered.Experience.match(/^• /gm) ?? []).length, 17)
      assert.doesNotThrow(() => assertLinkedInPrivacy(altered.Experience))
      assert.throws(() => assertApprovedLinkedInClaims(altered), { code: 'ERR_ASSERTION' }, role + ': ' + bullet)
    }
  }
})

test('LinkedIn evidence guard rejects unsupported durations, numbers, outcomes, and superlatives', async () => {
  const { sections } = await readLinkedInSections()
  for (const claim of [
    'I have ten years of web development experience.',
    'I increased sales by 40%.',
    'I delivered 100 websites.',
    'I made pages load in one second.',
    'I increased revenue for every business.',
    'I build the best websites in the industry.',
  ]) {
    for (const paragraph of approvedLinkedInAbout) {
      assert.throws(() => assertApprovedLinkedInClaims({
        ...sections, About: sections.About.replace(paragraph, paragraph + ' ' + claim),
      }), { code: 'ERR_ASSERTION' }, claim)
    }
    for (const bullets of Object.values(approvedLinkedInDescriptions)) {
      for (const bullet of bullets) {
        assert.throws(() => assertApprovedLinkedInClaims({
          ...sections, Experience: sections.Experience.replace(bullet, '• ' + claim),
        }), { code: 'ERR_ASSERTION' }, claim)
      }
    }
  }
})

test('JobsDB draft keeps the approved summary, all employers, and privacy-safe skills', async () => {
  const source = await readSource('content/jobsdb-profile.md')
  assert.match(source, /Senior Web Developer with nearly five years of experience working with WordPress, WooCommerce, Shopify and Next\.js\./)
  assert.match(source, /I build new sites, improve existing ones and support live ecommerce systems\./)
  for (const company of [
    'Entelech Digital', 'Geekster Digital Solution', 'TMES Co., Ltd.',
    'Thai Maritime Enforcement Command Center', 'Royal Thai Naval Air Division',
  ]) assert.ok(source.includes(company), `JobsDB must keep experience at ${company}`)
  for (const skill of ['WordPress', 'WooCommerce', 'Shopify', 'Next.js', 'PHP', 'Technical SEO']) {
    assert.ok(source.includes(skill), `JobsDB must include ${skill}`)
  }
  assertLinkedInPrivacy(source)
})
