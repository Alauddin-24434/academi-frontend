import AboutHeroSection from "@/components/about/hero-section"
import FeaturesSection from "@/components/home/features-section" // Reusing from home page
import WhyChooseUsSection from "@/components/about/why-choose-us-section"
import AchievementsSection from "@/components/about/achievements-section"

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <AchievementsSection />
    </>
  )
}
