"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useLenis } from "@/hooks/use-lenis"
import {
  ArrowRight,
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
  Award,
  Building,
  Globe,
  UserCheck,
  Badge,
  MessageSquare,
  CreditCard,
  Building2,
  Star,
  Shield,
} from "lucide-react"
import HeroSection from "@/components/home-section/heroSection"
import Link from "next/link"

export default function HomePage() {
  useLenis()
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Height with Fixed Background */}
      <HeroSection />
      {/* 2. About Section */}
      <section className="py-20" id="about">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="bg-gray-100 rounded-lg h-96">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="University campus"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <p className="text-teal-600 font-medium mb-4">About Our Institution</p>
                <h2 className="text-3xl font-bold mb-8">Excellence in Higher Education Since 1995</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Award className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
                      <p className="text-gray-600">
                        Recognized for outstanding academic programs and research contributions with international
                        accreditation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Globe className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
                      <p className="text-gray-600">
                        International partnerships and exchange programs providing students with global exposure and
                        opportunities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Building className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Modern Infrastructure</h3>
                      <p className="text-gray-600">
                        State-of-the-art facilities including smart classrooms, research labs, and digital library
                        resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      {/* Features Overview */}
      <section id="features"  className="w-full py-12 md:py-24 bg-gray-50 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <span>Features</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need to Manage Education
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From student enrollment to payment processing, our platform covers all aspects of educational
                administration.
              </p>
            </div>
          </div>
          <div className=" grid  items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600" />
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  Complete student lifecycle management with enrollment, status tracking, and profile management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Student registration & approval</li>
                  <li>• Academic session assignment</li>
                  <li>• Department & faculty organization</li>
                  <li>• Status tracking (Pending, Approved, Graduated)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-green-600" />
                <CardTitle>Communication Hub</CardTitle>
                <CardDescription>
                  Integrated messaging system with group communication and join request management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Individual & group messaging</li>
                  <li>• Student group creation</li>
                  <li>• Join request approval system</li>
                  <li>• Real-time communication</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CreditCard className="h-10 w-10 text-purple-600" />
                <CardTitle>Payment Processing</CardTitle>
                <CardDescription>
                  Secure payment management with transaction tracking and multiple payment statuses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Secure transaction processing</li>
                  <li>• Payment status tracking</li>
                  <li>• Transaction history</li>
                  <li>• Automated receipts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Academic Structure */}
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <span>Academic Organization</span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Structured Academic Management</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Organize your institution with faculties, departments, and academic sessions. Maintain clear
                  hierarchical structure for better administration.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">Faculty Management</h4>
                    <p className="text-sm text-gray-500">Organize departments under faculties</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold">Department Structure</h4>
                    <p className="text-sm text-gray-500">Unique codes and clear organization</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold">Academic Sessions</h4>
                    <p className="text-sm text-gray-500">Year-wise student management</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck className="h-6 w-6 text-orange-600" />
                  <div>
                    <h4 className="font-semibold">Role-Based Access</h4>
                    <p className="text-sm text-gray-500">Admin, Student, and User roles</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                alt="Academic Structure"
                className="aspect-square overflow-hidden rounded-xl object-cover shadow-lg"
                height="550"
                src="/placeholder.svg?height=550&width=550"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard Preview */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <span>Dashboard</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Analytics & Insights</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get real-time insights into your institution's performance with detailed analytics and reporting.
              </p>
            </div>
          </div>
          <div className=" grid  gap-6 py-12 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-blue-600">2,847</CardTitle>
                <CardDescription>Total Students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                  <span>+12%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-green-600">156</CardTitle>
                <CardDescription>Active Groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                  <span>+8%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-purple-600">$47,892</CardTitle>
                <CardDescription>Monthly Revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                  <span>+15%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-orange-600">98.5%</CardTitle>
                <CardDescription>Payment Success Rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                  <span>+2%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* User Roles Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <span>User Management</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built for Every User Type</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tailored experiences for administrators, students, and general users with role-based permissions.
              </p>
            </div>
          </div>
          <div className=" grid  gap-6 py-12 lg:grid-cols-3">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mx-auto" />
                <CardTitle>Administrators</CardTitle>
                <CardDescription>Full system control with comprehensive management capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-gray-500 space-y-1">
                  <p>• Manage all students and faculties</p>
                  <p>• Process payments and transactions</p>
                  <p>• View comprehensive analytics</p>
                  <p>• Configure system settings</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto" />
                <CardTitle>Students</CardTitle>
                <CardDescription>Personalized dashboard for academic and social activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-gray-500 space-y-1">
                  <p>• View academic information</p>
                  <p>• Join and create study groups</p>
                  <p>• Make payments securely</p>
                  <p>• Communicate with peers</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto" />
                <CardTitle>General Users</CardTitle>
                <CardDescription>Basic access for prospective students and visitors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-gray-500 space-y-1">
                  <p>• Browse available programs</p>
                  <p>• Submit applications</p>
                  <p>• Access public information</p>
                  <p>• Contact administration</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className=" py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <span>Testimonials</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Educational Institutions</h2>
            </div>
          </div>
          <div className=" grid  gap-6 py-12 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription>
                  "EduManage has transformed how we handle student administration. The integrated messaging and payment
                  system saves us hours every day."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">DR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Dean, University of Excellence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription>
                  "The group communication feature has revolutionized how our students collaborate. It's intuitive and
                  powerful."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">MK</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Kim</p>
                    <p className="text-sm text-gray-500">IT Director, Tech Institute</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription>
                  "Payment processing is seamless and secure. Our students love the transparency and ease of use."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600">LP</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lisa Patel</p>
                    <p className="text-sm text-gray-500">Registrar, Global Academy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    
      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <p className="text-xs text-gray-500">© 2024 EduManage. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500" href="#">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}
