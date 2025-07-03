"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Building2,
  FileText,
  CreditCard,
  Bell,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Award,
  Zap,
  ArrowRight,
  Play,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UniAdmit Pro
              </h1>
            </motion.div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
              🎓 Trusted by 500+ Universities
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Admission Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of university admissions with our AI-powered platform. Streamline applications,
              track progress, and connect with your dream institutions seamlessly.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <Link href="/student/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform text-lg px-8 py-4"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start Your Journey
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/admin/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:scale-105 transition-transform text-lg px-8 py-4 bg-transparent"
                  >
                    <Building2 className="mr-2 h-5 w-5" />
                    For Universities
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              { number: "50K+", label: "Students Enrolled", icon: Users },
              { number: "500+", label: "Partner Universities", icon: Building2 },
              { number: "95%", label: "Success Rate", icon: TrendingUp },
              { number: "24/7", label: "Support Available", icon: Shield },
            ].map((stat, index) => (
              <motion.div key={index} variants={scaleIn} className="text-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for
              <span className="text-blue-600"> Admission Success</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and features you need for a smooth admission process
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Users,
                title: "Smart Role Management",
                description:
                  "Dedicated dashboards for students, university admins, and super admins with role-based access control",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Building2,
                title: "Multi-University Support",
                description:
                  "Manage applications across multiple universities and departments with centralized tracking",
                color: "green",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: FileText,
                title: "Application Tracking",
                description: "Real-time status updates from application submission to final admission confirmation",
                color: "purple",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                description:
                  "Integrated payment gateway for application fees and admission payments with instant receipts",
                color: "orange",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Automated alerts for deadlines, status updates, and important announcements",
                color: "red",
                gradient: "from-red-500 to-pink-500",
              },
              {
                icon: Award,
                title: "Analytics & Reports",
                description: "Comprehensive insights and detailed reports for better decision making",
                color: "indigo",
                gradient: "from-indigo-500 to-purple-500",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader>
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with your admission journey in just a few simple steps
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and complete your student profile with academic details and preferences",
                icon: Users,
              },
              {
                step: "02",
                title: "Apply to Universities",
                description: "Browse universities, select programs, and submit applications with required documents",
                icon: FileText,
              },
              {
                step: "03",
                title: "Track & Get Admitted",
                description: "Monitor application status, make payments, and receive admission confirmations",
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                    {step.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 -z-10"></div>
                  )}
                </div>
                <step.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">What Students Say</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students who successfully got admitted using our platform
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Priya Sharma",
                university: "IIT Delhi",
                image: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "UniAdmit Pro made my admission process so smooth! I got into my dream university without any hassle.",
              },
              {
                name: "Rahul Kumar",
                university: "NIT Trichy",
                image: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "The real-time tracking and notifications kept me updated throughout. Highly recommended!",
              },
              {
                name: "Ananya Patel",
                university: "BITS Pilani",
                image: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "Amazing platform! The payment integration and document management features are excellent.",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.university}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">UniAdmit Pro</span>
              </div>
              <p className="text-gray-400">
                Transforming university admissions with cutting-edge technology and seamless user experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/student/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/student/applications" className="hover:text-white transition-colors">
                    Applications
                  </Link>
                </li>
                <li>
                  <Link href="/student/payments" className="hover:text-white transition-colors">
                    Payments
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Universities</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/admin/dashboard" className="hover:text-white transition-colors">
                    Admin Panel
                  </Link>
                </li>
                <li>
                  <Link href="/admin/applications" className="hover:text-white transition-colors">
                    Manage Applications
                  </Link>
                </li>
                <li>
                  <Link href="/admin/reports" className="hover:text-white transition-colors">
                    Reports
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UniAdmit Pro. All rights reserved. Made with ❤️ for students worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
