// pages/index.tsx
"use client"
import { useLenis } from "@/hooks/use-lenis"

// Page Sections (existing)
import HeroSection from "@/components/home-section/heroSection"
import AboutSection from "@/components/home-section/aboutSection"
import FeatureSection from "@/components/home-section/featureSection"

import RoleSection from "@/components/home-section/roleSection"

// NEW: Example components for home page snippets
// You would need to create these files and their content
import LatestEventsSection from "@/components/home-section/latestEventsSection"
import ContactSection from "@/components/home-section/contactSection"

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

      {/* --- New Sections (Snippets for Home Page) --- */}
      {/* ========= Latest Events Section ========= */}
      <LatestEventsSection />

      {/* ========= Contact ========= */}
      <ContactSection />

    </div>
  )
}