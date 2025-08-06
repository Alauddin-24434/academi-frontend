"use client"

import { motion } from "framer-motion"
import { BookOpen, UploadCloud, DollarSign, Search, ShoppingCart, PlayCircle } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#f9fdfc] text-gray-800">
      <div className="container mx-auto ">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">How the Platform Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you’re an instructor or a learner, it’s easy to get started and thrive.
          </p>
        </div>

        {/* Two-Path Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Instructor Path */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#00483d]">👩‍🏫 For Instructors</h3>
            <div className="space-y-6">
              <Step icon={<BookOpen />} title="1. Create an Account" desc="Sign up and set up your instructor profile in minutes." />
              <Step icon={<UploadCloud />} title="2. Upload Your Course" desc="Use our easy interface to add videos, PDFs, and quizzes." />
              <Step icon={<DollarSign />} title="3. Earn Revenue" desc="Publish and get paid when learners buy your course." />
            </div>
          </motion.div>

          {/* Student Path */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#00483d]">👨‍🎓 For Students</h3>
            <div className="space-y-6">
              <Step icon={<Search />} title="1. Browse or Search" desc="Explore thousands of courses across categories." />
              <Step icon={<ShoppingCart />} title="2. Enroll Free or Buy" desc="Join for free or buy a course with a few clicks." />
              <Step icon={<PlayCircle />} title="3. Learn Anytime" desc="Access your courses anytime, anywhere, on any device." />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

type StepProps = {
  icon: React.ReactNode
  title: string
  desc: string
}

function Step({ icon, title, desc }: StepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-[#e6f7f2] text-[#00483d]">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  )
}
