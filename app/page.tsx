import HeroSection from "@/components/home/hero-section"

import PopularCoursesSection from "@/components/home/popular-courses-section"
import StudentTestimonialSection from "@/components/home/student-testimonial-section"
import LatestArticlesSection from "@/components/home/latest-articles-section"
import TrustedBySection from "@/components/home/trastedBySection"


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection/>
      <PopularCoursesSection />

    
      <StudentTestimonialSection />
     
    </>
  )
}
