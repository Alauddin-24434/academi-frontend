import { courses } from "@/lib/data"
import CourseDetailTabs from "@/components/courses/course-detail-tabs"
import CourseSidebar from "@/components/courses/course-sidebar"
import { Clock, BookOpen, Users, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.id === params.slug)

  if (!course) {
    return <div className="text-center py-20">Course not found.</div>
  }

  return (
    <>
      <section className="relative bg-primary-green text-white py-16 md:py-24 overflow-hidden">
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
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt={course.instructor}
              width={60}
              height={60}
              className="rounded-full object-cover border-2 border-white"
            />
            <div>
              <p className="text-gray-300">Category</p>
              <p className="text-lg">{course.category}</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>10 Weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>All Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span>{course.lessons} Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>0 Quizzes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{course.students} Students</span>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/courses" className="hover:underline">
          All Courses
        </Link>{" "}
        / <span className="font-semibold">{course.title}</span>
      </div>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <CourseDetailTabs course={course} />
          </div>
          <div className="lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </section>
    </>
  )
}
