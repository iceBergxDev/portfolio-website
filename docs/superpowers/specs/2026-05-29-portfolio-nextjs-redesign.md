# Portfolio Redesign — Next.js 15 + TypeScript + Tailwind

**Date:** 2026-05-29  
**Status:** Approved  
**Scope:** Full migration from static HTML to Next.js 15 + redesign

---

## 1. Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SEO via SSG, routing, image optimization, Vercel deploy |
| Language | TypeScript | Industry standard, showcases skill to hirers |
| Styling | Tailwind CSS v4 | Utility-first, modern stack signal |
| Animation | Framer Motion | Smooth page transitions |
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
- **Hover / glow:** `#d97706`
- **Tinted bg:** `rgba(251,191,36,0.1)`
- Used on: logo dot, buttons, links, tags, section labels

### Typography
- **Headings:** `font-bold`, tight tracking (`tracking-tight`)
- **Body:** default Tailwind sans (Inter via Next.js font)
- **Accent label:** `uppercase tracking-widest text-amber-400 text-xs`

---

## 3. Site Structure

```
/                        ← Homepage
/projects                ← All projects grid
/case-study/[slug]       ← 7 individual case study pages
```

### Data files
```
src/data/
├── featured-work.ts     ← 3 homepage featured projects
├── all-projects.ts      ← all projects (7 case studies + future)
└── case-studies.ts      ← full data for 7 case study pages
```

Adding a new project = one object in `all-projects.ts`. No homepage changes needed.

---

## 4. Page Designs

### 4.1 Homepage (`/`)

**Sections (top to bottom):**

1. **Header / Nav** — sticky, dark bg, `Pirun.` logo (amber dot), links: Work · About · Contact
2. **Hero** — text left, photo right
   - Left: eyebrow tag (Web Developer · Bangkok), name, 1-line tagline, 2 buttons (View Work, Contact)
   - Right: portrait photo (full height, edge-to-edge on mobile below)
   - Amber accent line above eyebrow
3. **About** — 2-col: short bio paragraph + skills list, Download CV button
4. **Skills & Technologies** — icon grid (devicons), each links to case study that uses it
5. **Featured Work** — 3 cards, 3-column grid, equal weight
   - Card: cover image, project name, 1-line description, tech tags (amber), "View Case Study →" link
   - Below grid: "See All Projects →" → `/projects`
6. **Contact** — form (name, email, message) + Resend API, success/error state
7. **Footer** — name, GitHub, LinkedIn, email

### 4.2 All Projects (`/projects`)

- Page header: "All Work" + project count
- Filter bar (optional phase 2): by tech tag
- Grid: 3-col on desktop, 2-col tablet, 1-col mobile
- Card: thumbnail, name, tags, link to case study if exists, otherwise external link
- Grows indefinitely — adding to `all-projects.ts` auto-populates

### 4.3 Case Study (`/case-study/[slug]`)

- Same layout as current HTML case studies, converted to TSX
- Slugs: `foley`, `aj-flooring`, `asl`, `gatac`, `grind`, `birdhouse`, `newstart`
- Back link → `/projects`

---

## 5. Features

### Smooth Page Transitions
- Framer Motion `AnimatePresence` + `motion.div` wrapping page content
- Fade + slight Y translate (subtle, not distracting)
- Duration: 300ms ease-out

### Contact Form
- Fields: Name, Email, Message (all required)
- Submit → Next.js Route Handler (`/api/contact`) → Resend API → email to `pirun.ks@gmail.com`
- UI states: idle → loading → success / error
- No backend server needed — serverless function via Vercel

### Assets
- All images move to `public/image/`
- Resume PDF → `public/Resume-Pirun-Kongsaeng.pdf`
- Next.js `<Image>` component for all project images (auto WebP, lazy load)

---

## 6. Component Tree

```
app/
├── layout.tsx              ← RootLayout (font, metadata, Header, Footer)
├── page.tsx                ← Homepage
├── projects/
│   └── page.tsx            ← All projects grid
└── case-study/
    └── [slug]/
        └── page.tsx        ← Case study detail

components/
├── Header.tsx
├── Footer.tsx
├── HeroSection.tsx
├── AboutSection.tsx
├── SkillsSection.tsx
├── FeaturedWorkSection.tsx
├── ProjectCard.tsx         ← used on homepage + /projects
├── ContactForm.tsx
└── PageTransition.tsx      ← Framer Motion wrapper

app/api/
└── contact/
    └── route.ts            ← Resend API handler
```

---

## 7. Constraints & Non-Goals

- **No dark mode toggle** — dark only, by design
- **No blog** — out of scope
- **No auth** — static + one API route only
- **No database** — all project data in TypeScript files
- **No CMS** — adding projects = editing a `.ts` file (acceptable for developer portfolio)
- **TypeScript types kept simple** — no complex generics, learnable by reading

---

## 8. Success Criteria

- [ ] All 7 case studies accessible at `/case-study/[slug]`
- [ ] `/projects` shows all projects, grows by editing one file
- [ ] Contact form sends real email via Resend
- [ ] Page transitions feel smooth, not jarring
- [ ] Lighthouse score: Performance ≥ 90, SEO ≥ 90, Accessibility ≥ 85
- [ ] Deploys to Vercel from GitHub push
