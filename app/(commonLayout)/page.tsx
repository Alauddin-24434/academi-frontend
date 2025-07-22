"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useLenis } from "@/hooks/use-lenis"
import {
  Clock,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Dribbble,
  ArrowRight,
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
  MessageCircle,
  MapPin,
  Mail,
  Heart,
  Award,
  Building,
  Globe,
  Trophy,
  FileText,
  CheckCircle,
  UserCheck,
  Briefcase,
  Library,
  Coffee,
  Music,
} from "lucide-react"
import HeroSection from "@/components/home-section/heroSection"

export default function HomePage() {
  useLenis()

  return (
    <div className="min-h-screen bg-white">


      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-6">
                <a href="#home" data-lenis-scroll="#home" className="text-teal-600 font-medium">
                  Home
                </a>
                <a href="#about" data-lenis-scroll="#about" className="text-gray-600 hover:text-teal-600">
                  About
                </a>
                <a href="#programs" data-lenis-scroll="#programs" className="text-gray-600 hover:text-teal-600">
                  Programs
                </a>
                <a href="#faculty" data-lenis-scroll="#faculty" className="text-gray-600 hover:text-teal-600">
                  Faculty
                </a>
                <a href="#campus" data-lenis-scroll="#campus" className="text-gray-600 hover:text-teal-600">
                  Campus Life
                </a>
                <a href="#admissions" data-lenis-scroll="#admissions" className="text-gray-600 hover:text-teal-600">
                  Admissions
                </a>
                <a href="#news" data-lenis-scroll="#news" className="text-gray-600 hover:text-teal-600">
                  News
                </a>
                <a href="#contact" data-lenis-scroll="#contact" className="text-gray-600 hover:text-teal-600">
                  Contact
                </a>
              </div>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">Student Portal</Button>
          </div>
        </div>
      </nav>

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

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">15,000+</h3>
              <p className="text-gray-300">Students</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-gray-300">Faculty Members</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-gray-300">Degree Programs</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">25+</h3>
              <p className="text-gray-300">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Faculty Section */}
      <section className="py-20 bg-gray-50" id="faculty">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-medium mb-4">Our Faculty</p>
            <h2 className="text-3xl font-bold">Meet Our Distinguished Professors</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Ahmed",
                title: "Professor of Computer Science",
                expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Prof. Michael Rahman",
                title: "Dean of Business School",
                expertise: ["Strategic Management", "International Business", "Leadership"],
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Dr. Fatima Khan",
                title: "Professor of English Literature",
                expertise: ["Modern Literature", "Creative Writing", "Literary Criticism"],
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Prof. James Wilson",
                title: "Professor of Mathematics",
                expertise: ["Applied Mathematics", "Statistics", "Research Methods"],
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((faculty, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200">
                  <Image
                    src={faculty.image || "/placeholder.svg"}
                    alt={faculty.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-1">{faculty.name}</h3>
                  <p className="text-teal-600 text-sm mb-3">{faculty.title}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {faculty.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Student Life */}
      <section className="py-20" id="campus">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-medium mb-4">Campus Life</p>
            <h2 className="text-3xl font-bold">Vibrant Student Experience</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Library",
                description: "24/7 access to digital resources, study spaces, and research facilities.",
                icon: <Library className="w-8 h-8" />,
              },
              {
                title: "Student Clubs",
                description: "Over 50 active clubs covering academics, sports, arts, and community service.",
                icon: <Users className="w-8 h-8" />,
              },
              {
                title: "Sports Complex",
                description: "State-of-the-art gymnasium, swimming pool, and outdoor sports facilities.",
                icon: <Trophy className="w-8 h-8" />,
              },
              {
                title: "Cafeteria",
                description: "Multiple dining options with healthy, affordable meals for all dietary needs.",
                icon: <Coffee className="w-8 h-8" />,
              },
              {
                title: "Arts Center",
                description: "Theater, music rooms, and art studios for creative expression and performances.",
                icon: <Music className="w-8 h-8" />,
              },
              {
                title: "Career Services",
                description: "Job placement assistance, internship programs, and career counseling.",
                icon: <Briefcase className="w-8 h-8" />,
              },
            ].map((facility, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-teal-600">{facility.icon}</div>
                </div>
                <h3 className="font-semibold text-lg mb-3">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Admissions */}
      <section className="py-20 bg-gray-50" id="admissions">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-medium mb-4">Admissions</p>
            <h2 className="text-3xl font-bold">Join Our Academic Community</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Form Filup",
                description: "Submit online application with required documents and transcripts.",
                icon: <FileText className="w-6 h-6" />,
              },
              {
                step: "2",
                title: "Review",
                description: "Academic review of credentials and entrance exam if required.",
                icon: <UserCheck className="w-6 h-6" />,
              },
              {
                step: "3",
                title: "Approve",
                description: "Personal interview with faculty members and admissions committee.",
                icon: <MessageCircle className="w-6 h-6" />,
              },
              {
                step: "4",
                title: "Payment",
                description: "Complete enrollment process and begin your academic journey.",
                icon: <CheckCircle className="w-6 h-6" />,
              },
            ].map((step, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-teal-600">{step.icon}</div>
                </div>
                <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              Start Your FormFilap <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 7. News & Events */}
      <section className="py-20" id="news">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-medium mb-4">Latest Events</p>
            <h2 className="text-3xl font-bold">News & Events</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                type: "News",
                title: "University Receives International Accreditation",
                date: "January 15, 2025",
                description:
                  "Our institution has been awarded prestigious international accreditation for academic excellence.",
              },
              {
                type: "Event",
                title: "Annual Science Fair 2025",
                date: "February 20, 2025",
                description: "Students showcase innovative research projects and compete for academic recognition.",
              },
              {
                type: "Achievement",
                title: "Students Win National Debate Championship",
                date: "January 10, 2025",
                description:
                  "Our debate team brings home the national championship trophy for the third consecutive year.",
              },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-300"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">
                      {item.type}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <Button variant="ghost" className="mt-4 p-0 text-teal-600 hover:text-teal-700">
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-teal-600">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-4">Stay Connected with DIU</h2>
              <p>Get the latest news, events, and updates from our university community.</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none"
              />
              <Button className="bg-teal-700 hover:bg-teal-800 rounded-l-none">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-gray-900 text-white py-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Dhaka International University</h3>
                <p className="text-gray-400">Excellence in Higher Education</p>
              </div>
              <p className="text-gray-400 mb-4">
                Committed to providing world-class education and fostering innovation, research, and academic excellence
                for over 25 years.
              </p>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Academic Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Faculty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Campus Life
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Student Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Student Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Library
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Career Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Financial Aid
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Academic Calendar
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">House 4, Road 1, Dhanmondi, Dhaka 1205, Bangladesh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+880 1234 567890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">info@diu.edu.bd</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="text-sm">
              Copyright ©2025 Dhaka International University. All rights reserved | Designed with{" "}
              <Heart className="w-4 h-4 inline text-red-500" /> for academic excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
