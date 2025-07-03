"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  FileText,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  DollarSign,
  Target,
  Filter,
  Download,
  Search,
  MoreHorizontal,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function AdminDashboard() {
  // Mock data for charts
  const applicationTrendData = [
    { month: "Jan", applications: 245, confirmed: 89, rejected: 45, pending: 111 },
    { month: "Feb", applications: 312, confirmed: 124, rejected: 67, pending: 121 },
    { month: "Mar", applications: 189, confirmed: 78, rejected: 34, pending: 77 },
    { month: "Apr", applications: 278, confirmed: 145, rejected: 56, pending: 77 },
    { month: "May", applications: 356, confirmed: 189, rejected: 78, pending: 89 },
    { month: "Jun", applications: 423, confirmed: 234, rejected: 89, pending: 100 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 125000, target: 150000 },
    { month: "Feb", revenue: 189000, target: 180000 },
    { month: "Mar", revenue: 156000, target: 170000 },
    { month: "Apr", revenue: 234000, target: 200000 },
    { month: "May", revenue: 278000, target: 250000 },
    { month: "Jun", revenue: 345000, target: 300000 },
  ]

  const universityPerformance = [
    { name: "State University", applications: 156, acceptance: 78, revenue: 78000 },
    { name: "Tech Institute", applications: 134, acceptance: 89, revenue: 100500 },
    { name: "National University", applications: 98, acceptance: 67, revenue: 58800 },
    { name: "International College", applications: 87, acceptance: 45, revenue: 87000 },
    { name: "Engineering College", applications: 76, acceptance: 56, revenue: 45600 },
  ]

  const statusDistribution = [
    { name: "Confirmed", value: 456, color: "#10B981" },
    { name: "Pending", value: 234, color: "#3B82F6" },
    { name: "Waiting", value: 123, color: "#F59E0B" },
    { name: "Rejected", value: 89, color: "#EF4444" },
  ]

  const stats = {
    totalApplications: 1247,
    pendingApplications: 234,
    confirmedApplications: 456,
    rejectedApplications: 89,
    totalRevenue: 2450000,
    pendingPayments: 145000,
    activeUniversities: 25,
    totalStudents: 5678,
  }

  const recentApplications = [
    {
      id: "1",
      studentName: "Alice Johnson",
      university: "State University",
      department: "Computer Science",
      status: "PENDING",
      appliedAt: "2024-01-28",
      round: 1,
      fee: 500,
    },
    {
      id: "2",
      studentName: "Bob Smith",
      university: "Tech Institute",
      department: "Software Engineering",
      status: "CONFIRMED",
      appliedAt: "2024-01-27",
      round: 2,
      fee: 750,
    },
    {
      id: "3",
      studentName: "Carol Davis",
      university: "National University",
      department: "Information Technology",
      status: "WAITING",
      appliedAt: "2024-01-26",
      round: 1,
      fee: 600,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "WAITING":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "PENDING":
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800"
      case "WAITING":
        return "bg-yellow-100 text-yellow-800"
      case "PENDING":
        return "bg-blue-100 text-blue-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
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
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">Admin</span>
              </div>
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
              value: stats.totalApplications.toLocaleString(),
              change: "+12% from last month",
              icon: FileText,
              color: "blue",
              gradient: "from-blue-500 to-blue-600",
            },
            {
              title: "Active Students",
              value: stats.totalStudents.toLocaleString(),
              change: "+8% from last month",
              icon: Users,
              color: "green",
              gradient: "from-green-500 to-green-600",
            },
            {
              title: "Total Revenue",
              value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
              change: "+15% from last month",
              icon: DollarSign,
              color: "purple",
              gradient: "from-purple-500 to-purple-600",
            },
            {
              title: "Success Rate",
              value: "78%",
              change: "+5% from last month",
              icon: Target,
              color: "orange",
              gradient: "from-orange-500 to-orange-600",
            },
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <div
                    className={`h-10 w-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Trends */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Application Trends</span>
                  </CardTitle>
                  <CardDescription>Monthly application statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      applications: { label: "Applications", color: "hsl(var(--chart-1))" },
                      confirmed: { label: "Confirmed", color: "hsl(var(--chart-2))" },
                      rejected: { label: "Rejected", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={applicationTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="applications"
                          stackId="1"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="confirmed"
                          stackId="1"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="rejected"
                          stackId="1"
                          stroke="#EF4444"
                          fill="#EF4444"
                          fillOpacity={0.4}
                        />
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
                      pending: { label: "Pending", color: "#3B82F6" },
                      waiting: { label: "Waiting", color: "#F59E0B" },
                      rejected: { label: "Rejected", color: "#EF4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
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

            {/* Revenue & Recent Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Revenue vs Target</span>
                  </CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                      target: { label: "Target", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest application submissions</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(app.status)}
                          <div>
                            <h4 className="font-medium">{app.studentName}</h4>
                            <p className="text-sm text-gray-600">
                              {app.university} - {app.department}
                            </p>
                            <p className="text-xs text-gray-500">
                              Round {app.round} • {app.appliedAt} • ₹{app.fee}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
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
                <CardTitle>Application Management</CardTitle>
                <CardDescription>Review and manage all student applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-6 border rounded-lg hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(app.status)}
                        <div>
                          <h3 className="font-semibold text-lg">{app.studentName}</h3>
                          <p className="text-gray-600">
                            {app.university} - {app.department}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>Round {app.round}</span>
                            <span>•</span>
                            <span>{app.appliedAt}</span>
                            <span>•</span>
                            <span>Fee: ₹{app.fee}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          Process
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="universities">
            <Card>
              <CardHeader>
                <CardTitle>University Performance</CardTitle>
                <CardDescription>Performance metrics for partner universities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {universityPerformance.map((uni, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-6 border rounded-lg hover:shadow-lg transition-all"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{uni.name}</h3>
                        <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                          <span>{uni.applications} Applications</span>
                          <span>{uni.acceptance} Accepted</span>
                          <span>₹{uni.revenue.toLocaleString()} Revenue</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Success Rate</div>
                          <div className="font-semibold">{Math.round((uni.acceptance / uni.applications) * 100)}%</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
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
                  <CardTitle>University Performance Comparison</CardTitle>
                  <CardDescription>Applications vs acceptance rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      applications: { label: "Applications", color: "hsl(var(--chart-1))" },
                      acceptance: { label: "Acceptance", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={universityPerformance} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="applications" fill="#3B82F6" />
                        <Bar dataKey="acceptance" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                  <CardDescription>Important metrics at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Success Rate</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Payment Collection Rate</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Student Satisfaction</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>System Uptime</span>
                      <span className="font-semibold">99.9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-500 h-3 rounded-full" style={{ width: "99.9%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>Generate comprehensive reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Application Report", description: "Detailed application statistics", icon: FileText },
                    { title: "Revenue Report", description: "Financial performance analysis", icon: DollarSign },
                    { title: "University Report", description: "Partner university metrics", icon: Building2 },
                  ].map((report, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="text-center">
                        <report.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                          <Download className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
