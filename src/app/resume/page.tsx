import type { Metadata } from 'next'
import Image from 'next/image'
import { careerProfile } from '@/data/career-profile'
import './resume.css'

const summary = 'I’m a Senior Web Developer based in Bangkok with nearly five years of experience across WordPress, WooCommerce, Shopify and Next.js. I build new sites, improve existing ones and support live ecommerce systems. My work includes custom themes and plugins, API integrations, technical SEO, performance, testing and deployment.'
const asciiDashes = (value: string) => value.replace(/[‐‑‒–—―]/g, '-')

export const metadata: Metadata = {
  title: `${careerProfile.contact.name} - Resume`,
  description: summary,
  alternates: {
    canonical: '/resume',
  },
}

type ContactIconName = 'location' | 'phone' | 'email' | 'web'

function ContactIcon({ name }: { name: ContactIconName }) {
  if (name === 'location') {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-4.3-1.1-1.2 3a15.2 15.2 0 0 1-10.4-10l3-1.2L7 3Z" />
      </svg>
    )
  }

  if (name === 'email') {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  )
}

export default function ResumePage() {
  const { contact } = careerProfile

  return (
    <article className="resume-page" aria-labelledby="resume-name">
      <div className="resume-main">
        <header className="resume-header">
          <h1 id="resume-name">{contact.name}</h1>
          <p className="resume-headline">{careerProfile.headline}</p>
        </header>

        <section className="resume-experience" aria-labelledby="resume-experience">
          <h2 id="resume-experience">Professional Experience</h2>
          {careerProfile.experience.map((job) => (
            <div className="resume-job" key={`${job.company}-${job.period}`}>
              <h3>{job.role}</h3>
              <p className="resume-employer">
                <strong>{job.company}</strong>
                <span aria-hidden="true"> | </span>
                <span>{asciiDashes(job.period)}</span>
              </p>
              <ul>
                {job.resumeHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-main-capabilities" aria-labelledby="resume-capabilities">
          <h2 id="resume-capabilities">Core Capabilities</h2>
          <ul className="resume-capabilities">
            {careerProfile.capabilities.map((capability) => (
              <li key={capability.title}>
                <strong>{capability.title}:</strong> {capability.description}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="resume-sidebar" aria-label="Profile, contact details and skills">
        <div className="resume-portrait-frame">
          <Image
            className="resume-portrait"
            src="/images/resume/pirun-kongsaeng.jpg"
            width={600}
            height={400}
            alt="Pirun Kongsaeng"
            priority
            unoptimized
          />
        </div>

        <section aria-labelledby="resume-contact">
          <h2 id="resume-contact">Contact</h2>
          <address className="resume-contact-list">
            <p>
              <ContactIcon name="location" />
              <span>{contact.location}</span>
            </p>
            <p>
              <ContactIcon name="phone" />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </p>
            <p>
              <ContactIcon name="email" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>
              <ContactIcon name="web" />
              <a href={contact.portfolio}>{contact.portfolio}</a>
            </p>
            <p>
              <ContactIcon name="web" />
              <a href={contact.linkedin}>{contact.linkedin}</a>
            </p>
            <p>
              <ContactIcon name="web" />
              <a href={contact.github}>{contact.github}</a>
            </p>
          </address>
        </section>

        <section aria-labelledby="resume-summary">
          <h2 id="resume-summary">About Me</h2>
          <p>{summary}</p>
        </section>

        <section aria-labelledby="resume-skills">
          <h2 id="resume-skills">Technical Skills</h2>
          {careerProfile.skillGroups.map((group) => (
            <p className="resume-skill-group" key={group.title}>
              <strong>{group.title}:</strong> {group.skills.join(', ')}
            </p>
          ))}
        </section>

        <section aria-labelledby="resume-education">
          <h2 id="resume-education">Education</h2>
          {careerProfile.education.map((education) => (
            <p className="resume-education" key={education.qualification}>
              <strong>{education.qualification}</strong>
              <span>{education.institution}</span>
              <span>{asciiDashes(education.period)} · GPA {education.gpa}</span>
            </p>
          ))}
        </section>

        <section aria-labelledby="resume-languages">
          <h2 id="resume-languages">Languages</h2>
          <p>Thai (Native) · English (Working proficiency)</p>
        </section>
      </aside>
    </article>
  )
}
