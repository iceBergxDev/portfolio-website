import PageTransition from '@/components/PageTransition'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsMarquee from '@/components/SkillsMarquee'
import FeaturedWorkSection from '@/components/FeaturedWorkSection'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <SkillsMarquee />
      <FeaturedWorkSection />
      <ContactSection />
    </PageTransition>
  )
}
