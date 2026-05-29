const skills = [
  { name: 'WordPress', icon: 'devicon-wordpress-plain' },
  { name: 'WooCommerce', icon: 'devicon-woocommerce-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'PHP', icon: 'devicon-php-plain' },
  { name: 'HTML5', icon: 'devicon-html5-plain' },
  { name: 'CSS3', icon: 'devicon-css3-plain' },
  { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
  { name: 'Git', icon: 'devicon-git-plain' },
  { name: 'Figma', icon: 'devicon-figma-plain' },
]

const doubled = [...skills, ...skills]

export default function SkillsMarquee() {
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-accent">Skills & Technologies</p>
      </div>
      <div className="marquee-container">
        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((skill, i) => (
            <div key={`${skill.name}-${i}`} className="flex flex-col items-center gap-2 min-w-[80px]">
              <i className={`${skill.icon} colored text-4xl`} />
              <span className="text-xs text-text-muted whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
