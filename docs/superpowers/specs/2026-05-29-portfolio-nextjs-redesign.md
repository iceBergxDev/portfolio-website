# Portfolio Redesign — Next.js 15 + TypeScript + Tailwind

**Date:** 2026-05-29
**Status:** Approved (v2 — post-review)
**Scope:** Full migration from static HTML to Next.js 15 + redesign

---

## 1. Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SEO via SSG, routing, image optimization, Vercel deploy |
| Language | TypeScript | Industry standard, showcases skill to hirers |
| Styling | Tailwind CSS **v3.4** | Stable, docs เยอะ, เรียนง่ายกว่า v4 |
| Animation | Framer Motion | Enter-only page transitions (v3.4 compatible) |
| Email | Resend API | Contact form → real email delivery |
| Deploy | Vercel | Free tier, instant CI/CD from GitHub |

---

## 2. Visual Design

### Theme
- **Mode:** Dark only (no toggle)
- **Base background:** `#0a0a0a`
- **Surface:** `#111111`, `#1a1a1a`
- **Border:** `#1f2937`
- **Text:** `#f9fafb` (primary), `#9ca3af` (secondary)

### Accent Color
- **Primary:** Amber `#fbbf24`
- **Hover:** `#d97706`
- **Tinted bg:** `rgba(251,191,36,0.1)`
- Defined as CSS variable `--color-accent: #fbbf24` in `globals.css`
- Used on: logo dot, buttons, links, tags, section labels

### Typography
- **Headings:** `font-bold`, tight tracking (`tracking-tight`)
- **Body:** Inter via `next/font/google`
- **Accent label:** `uppercase tracking-widest text-amber-400 text-xs`

---

## 3. Site Structure

```
/                        ← Homepage
/projects                ← All projects grid
/case-study/[slug]       ← 7 individual case study pages
```

### Data & Types
```
src/
├── types/
│   └── project.ts       ← Project interface (shared everywhere)
└── data/
    ├── featured-work.ts ← 3 homepage featured projects
    ├── all-projects.ts  ← all projects (7 case studies + future)
    └── case-studies.ts  ← full data for 7 case study pages
```

Adding a new project = one object in `all-projects.ts`. No homepage changes needed.

---

## 4. Page Designs

### 4.1 Homepage (`/`)

**Sections (top to bottom):**

1. **Header / Nav** — sticky, dark bg, `Pirun.` logo (amber dot), links: Work · About · Contact
2. **Hero** — text left, photo right
   - Left: eyebrow (Web Developer · Bangkok), name, 1-line tagline
   - CTAs: `[View Work]` `[Contact]` + text link "or download my resume (PDF) →"
   - Right: portrait photo (full height, edge-to-edge on mobile below)
   - Amber accent line above eyebrow
3. **About** — 2-col: short bio paragraph + skills list + Download CV button
4. **Skills & Technologies** — 1-row infinite marquee loop (pure CSS `@keyframes`), icon + label, no links, no hover, no interaction — purely visual, proof of skills is in case studies below
5. **Featured Work** — 3 cards, 3-column grid, equal weight
   - Card: cover image, project name, 1-line description, tech tags (amber), "View Case Study →" link
   - Below grid: "See All Projects →" → `/projects`
6. **Contact** — form (name, email, message) + Resend API, success/error state
7. **Footer** — name · GitHub · LinkedIn · email · **Resume (PDF) ↓**

**Resume download placements: Hero (text link) · About (button) · Footer (link) — 3 touch points**

### 4.2 All Projects (`/projects`)

- Page header: "All Work" + project count
- Filter bar (optional phase 2): by tech tag
- Grid: 3-col on desktop, 2-col tablet, 1-col mobile
- Card: thumbnail, name, tags, link to case study if exists, otherwise external link
- Grows indefinitely — adding to `all-projects.ts` auto-populates

### 4.3 Case Study (`/case-study/[slug]`)

- Same layout as current HTML case studies, converted to TSX
- Slugs: `foley`, `aj-flooring`, `asl`, `gatac`, `grind`, `birdhouse`, `newstart`
- `generateStaticParams()` feeds from `case-studies.ts` slug list
- **Next.js 15 note:** `params` prop is async — must `await params` before destructuring slug
- Back link → `/projects`

---

## 5. Features

### Page Transitions
- Framer Motion `motion.div` — **enter-only** (fade in + slight Y translate up)
- No exit animations — Next.js 15 App Router does not support stable exit animation lifecycle
- Duration: 300ms ease-out
- Feels smooth without being showy

### Contact Form
- Fields: Name, Email, Message (all required)
- Submit → Next.js Route Handler (`/api/contact`) → Resend API → email to `pirun.ks@gmail.com`
- UI states: idle → loading → success / error
- No backend server needed — serverless function via Vercel

### Assets
- All images → `public/image/`
- Resume PDF → `public/Resume-Pirun-Kongsaeng.pdf`
- Next.js `<Image>` component on all project images — include `sizes` prop per card context

---

## 6. Component Tree

```
src/
├── types/
│   └── project.ts              ← Project interface

app/
├── layout.tsx                  ← RootLayout (font, metadata, Header, Footer)
├── page.tsx                    ← Homepage
├── projects/
│   └── page.tsx                ← All projects grid
└── case-study/
    └── [slug]/
        └── page.tsx            ← Case study detail

components/
├── Header.tsx
├── Footer.tsx
├── HeroSection.tsx
├── AboutSection.tsx
├── SkillsSection.tsx
├── FeaturedWorkSection.tsx
├── ProjectCard.tsx             ← shared: homepage + /projects
├── ContactForm.tsx             ← client component
└── PageTransition.tsx          ← Framer Motion enter wrapper

app/api/
└── contact/
    └── route.ts                ← Resend API handler
```

---

## 7. Constraints & Non-Goals

- **No dark mode toggle** — dark only, by design
- **No blog** — out of scope
- **No auth** — static + one API route only
- **No database** — all project data in TypeScript files
- **No CMS** — adding projects = editing a `.ts` file (fine for developer portfolio)
- **No rate limiting** — portfolio, not a public service
- **TypeScript types kept simple** — no complex generics, learnable by reading

---

## 8. Success Criteria

- [ ] All 7 case studies accessible at `/case-study/[slug]`
- [ ] `/projects` shows all projects, grows by editing one file
- [ ] Contact form sends real email via Resend
- [ ] Resume downloadable from 3 places (Hero, About, Footer)
- [ ] Page transitions feel smooth on enter
- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 90, Accessibility ≥ 85
- [ ] Deploys to Vercel from GitHub push
