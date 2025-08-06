import { blogPosts } from "@/lib/data"
import BlogPostContent from "@/components/blog/blog-post-content"
import BlogComments from "@/components/blog/blog-comments"
import Link from "next/link"
import Image from "next/image"

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.id === params.slug)

  if (!post) {
    return <div className="text-center py-20">Blog post not found.</div>
  }

  return (
    <>
      <section className="relative bg-primary-green text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-[#003d33] opacity-90" />
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Background pattern"
            fill
            className="object-cover object-right-top opacity-20"
            style={{ objectFit: "cover", objectPosition: "right top" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 space-y-6">
          <p className="text-lg font-semibold text-accent-yellow">Latest blog</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{post.title}</h1>
          <p className="text-lg md:text-xl max-w-md">How to evaluate the effective of training programs.</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="font-semibold">{post.title}</span>
      </div>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <BlogPostContent post={post} />
          <BlogComments post={post} />
        </div>
      </section>
    </>
  )
}
