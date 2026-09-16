import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection'
import SkillsMarquee from '@/components/sections/SkillsMarquee'
import ExperienceSection from '@/components/sections/ExperienceSection'
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <SkillsMarquee />
      <FeaturedWorkSection />
      <ExperienceSection />
      <ContactSection />
    </PageTransition>
  )
}
