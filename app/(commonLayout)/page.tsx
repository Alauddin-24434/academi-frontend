"use client"
import { useLenis } from "@/hooks/use-lenis"

// Page Sections
import HeroSection from "@/components/home-section/heroSection"
import AboutSection from "@/components/home-section/aboutSection"
import FeatureSection from "@/components/home-section/featureSection"
import AcademicSection from "@/components/home-section/academicSection"
import RoleSection from "@/components/home-section/roleSection"

export default function HomePage() {
  // Smooth scrolling using Lenis hook
  useLenis()

  return (
    <div className="min-h-screen">
      {/* ========= Hero Section ========= */}
      <HeroSection />

      {/* ========= About Section ========= */}
      <AboutSection />

      {/* ========= User Role Section ========= */}
      <RoleSection />

      {/* ========= Feature Highlights Section ========= */}
      <FeatureSection />

      {/* ========= Academic Structure Section ========= */}
      <AcademicSection />

    </div>
  )
}
