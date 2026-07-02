# iceBerg — Portfolio Website

Personal portfolio built with the Next.js App Router, featuring project case studies and a resume.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

**Live demo:** [portfolio-website-six-zeta.vercel.app](https://portfolio-website-six-zeta.vercel.app)

## Features

- Detailed case study pages for individual projects
- Animated page and section transitions with Framer Motion
- Contact form backed by the Resend API
- Responsive layout across desktop and mobile

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 3.4](https://tailwindcss.com/)
- [Framer Motion 12](https://www.framer.com/motion/)
- [Resend](https://resend.com/) for contact form email delivery
- [ESLint 9](https://eslint.org/)

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/iceBergxDev/portfolio-website.git
cd portfolio-website
npm install
```

A `pnpm-lock.yaml` is also present, so `pnpm install` works as an alternative.

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── app/                    # App Router routes
│   ├── projects/           # Projects listing page
│   ├── case-study/[slug]/  # Individual case study pages
│   └── api/
│       └── contact/        # Contact form API route (Resend)
├── components/
│   ├── layout/             # Layout components (nav, transitions, etc.)
│   ├── sections/           # Page sections (About, etc.)
│   └── ui/                 # Reusable UI components
└── data/
    ├── all-projects.ts     # Project data
    └── case-studies.ts     # Case study content
```

## About

Built by iceBerg, a developer with 4+ years of experience across WordPress (Elementor, custom PHP plugins), React, and Next.js, including full-stack apps with Shopify API integration. Works with agencies and clients across Australia, Thailand, and the UK. Background in aircraft maintenance before moving into software development.

## License

Licensed under the [MIT License](./LICENSE).

## Contact

See the [live site](https://portfolio-website-six-zeta.vercel.app) for contact details.
