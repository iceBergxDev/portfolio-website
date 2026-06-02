import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsMarquee from '@/components/sections/SkillsMarquee'
import ExperienceSection from '@/components/sections/ExperienceSection'
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <SkillsMarquee />
      <ExperienceSection />
      <FeaturedWorkSection />
      <ContactSection />
    </PageTransition>
  )
}
