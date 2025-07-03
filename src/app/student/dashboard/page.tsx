"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bell, FileText, CreditCard, GraduationCap, Plus, Eye, TrendingUp, Calendar, Clock, CheckCircle, AlertCircle, DollarSign, Target, BookOpen, Award } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

export default function StudentDashboard() {
  // Mock data for charts
  const applicationTrendData = [
    { month: "Jan", applications: 2, accepted: 1 },
    { month: "Feb", applications: 3, accepted: 2 },
    { month: "Mar", applications: 1, accepted: 1 },
    { month: "Apr", applications: 4, accepted: 2 },
    { month: "May", applications: 2, accepted: 1 },
    { month: "Jun", applications: 3, accepted: 3 },
  ]

  const statusDistribution = [
    { name: "Confirmed", value: 1, color: "#10B981" },
    { name: "Waiting", value: 1, color: "#F59E0B" },
    { name: "Pending", value: 1, color: "#3B82F6" },
    { name: "Under Review", value: 2, color: "#8B5CF6" },
  ]

  const paymentHistory = [
    { month: "Jan", amount: 500 },
    { month: "Feb", amount: 750 },
    { month: "Mar", amount: 600 },
    { month: "Apr", amount: 800 },
    { month: "May", amount: 450 },
    { month: "Jun", amount: 900 },
  ]

  const applications = [
    {
      id: "1",
      university: "State University",
      department: "Computer Science",
      status: "CONFIRMED",
      round: 1,
      applicationFee: 500,
      createdAt: "2024-01-15",
      progress: 100,
    },
    {
      id: "2",
      university: "Tech Institute",
      department: "Software Engineering", 
      status: "WAITING",
      round: 2,
      applicationFee: 750,
      createdAt: "2024-01-20",
      progress: 75,
    },
    {
      id: "3",
      university: "National University",
      department: "Information Technology",
      status: "PENDING",
      round: 1,
      applicationFee: 600,
      createdAt: "2024-01-25",
      progress: 60,
    },
  ]

  const notices = [
    {
      id: "1",
      title: "Admission Round 2 Results",
      content: "Results for admission round 2 have been published.",
      publishedAt: "2024-01-28",
      priority: "high",
    },
    {
      id: "2",
      title: "Payment Deadline Extended",
      content: "Payment deadline has been extended to February 15th.",
      publishedAt: "2024-01-26",
      priority: "medium",
    },
  ]

  const upcomingDeadlines = [
    { task: "Submit Documents - Tech Institute", date: "Feb 15, 2024", priority: "high" },
    { task: "Interview - State University", date: "Feb 20, 2024", priority: "medium" },
    { task: "Final Payment - National University", date: "Feb 25, 2024", priority: "high" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "bg-green-100 text-green-800"
      case "WAITING": return "bg-yellow-100 text-yellow-800"
      case "PENDING": return "bg-blue-100 text-blue-800"
      case "REJECTED": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <div className="text-sm text-gray-600">Welcome, <span className="font-semibold">John Doe</span></div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            {
              title: "Total Applications",
              value: "5",
              change: "+2 this month",
              icon: FileText,
              color: "blue",
              gradient: "from-blue-500 to-blue-600"
            },
            {
              title: "Confirmed Admissions",
              value: "1",
              change: "33% success rate",
              icon: CheckCircle,
              color: "green", 
              gradient: "from-green-500 to-green-600"
            },
            {
              title: "Pending Payments",
              value: "₹1,350",
              change: "2 payments due",
              icon: CreditCard,
              color: "orange",
              gradient: "from-orange-500 to-orange-600"
            },
            {
              title: "Application Score",
              value: "8.5/10",
              change: "+0.5 this month",
              icon: Award,
              color: "purple",
              gradient: "from-purple-500 to-purple-600"
            }
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Status Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Application Progress</span>
                  </CardTitle>
                  <CardDescription>Your application journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      applications: { label: "Applications", color: "hsl(var(--chart-1))" },
                      accepted: { label: "Accepted", color: "hsl(var(--chart-2))" }
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={applicationTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="applications" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="accepted" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>Current status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      confirmed: { label: "Confirmed", color: "#10B981" },
                      waiting: { label: "Waiting", color: "#F59E0B" },
                      pending: { label: "Pending", color: "#3B82F6" },
                      review: { label: "Under Review", color: "#8B5CF6" }
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications & Notices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Your latest application submissions</CardDescription>
                  </div>
                  <Link href="/student/applications/new">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="h-4 w-4 mr-2" />
                      New Application
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{app.university}</h4>
                            <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{app.department}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{app.progress}%</span>
                            </div>
                            <Progress value={app.progress} className="h-2" />
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                  <CardDescription>Important dates to remember</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                        <div>
                          <h4 className="font-medium text-sm">{deadline.task}</h4>
                          <p className="text-xs text-gray-600 mt-1">{deadline.date}</p>
                        </div>
                        <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                          {deadline.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Manage and track all your university applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-6 border rounded-lg hover:shadow-lg transition-all">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-lg">{app.university}</h3>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{app.department}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Round {app.round}</span>
                          <span>•</span>
                          <span>Applied on {app.createdAt}</span>
                          <span>•</span>
                          <span>Fee: ₹{app.applicationFee}</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Application Progress</span>
                            <span>{app.progress}%</span>
                          </div>
                          <Progress value={app.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Your payment trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      amount: { label: "Amount (₹)", color: "hsl(var(--chart-1))" }
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={paymentHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Metrics</CardTitle>
                  <CardDescription>Your application performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Application Success Rate</span>
                      <span className="font-semibold">33%</span>
                    </div>
                    <Progress value={33} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Completion</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Document Verification</span>
                      <span className="font-semibold">100%</span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Payment Completion</span>
                      <span className="font-semibold">67%</span>
                    </div>
                    <Progress value={67} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>Important Dates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{deadline.task}</h4>
                          <p className="text-sm text-gray-600">{deadline.date}</p>
                        </div>
                        <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                          {deadline.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-purple-600" />
                    <span>Recent Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <div key={notice.id} className="border-l-4 border-purple-500 pl-4 py-2">
                        <h4 className="font-medium text-sm">{notice.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notice.content}</p>
                        <p className="text-xs text-gray-500 mt-2">{notice.publishedAt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
