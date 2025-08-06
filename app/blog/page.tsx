import BlogHeroSection from "@/components/blog/hero-section"
import BlogList from "@/components/blog/blog-list"
import Link from "next/link"

export default function BlogPage() {
  return (
    <>
      <BlogHeroSection />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
      </div>
      <BlogList />
    </>
  )
}
