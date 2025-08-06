import InstructorsHeroSection from "@/components/instructors/hero-section"
import InstructorStatsSection from "@/components/instructors/stats-section"
import InstructorGrid from "@/components/instructors/instructor-grid"
import Link from "next/link"

export default function InstructorsPage() {
  return (
    <>
      <InstructorsHeroSection />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/instructors" className="hover:underline">
          Our Instructors
        </Link>
      </div>
      <InstructorStatsSection />
      <InstructorGrid />
    </>
  )
}
