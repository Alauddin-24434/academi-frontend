"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { School, Building2, Users, FileText, CreditCard, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"

// Mock user data - replace with actual auth


// Mock data - replace with actual API calls
const mockStats = {
  SUPER_ADMIN: {
    totalUniversities: 45,
    totalStudents: 12543,
    totalApplications: 8932,
    pendingApplications: 234,
    totalRevenue: 2543000,
    monthlyGrowth: 12.5,
  },
  UNIVERSITY_ADMIN: {
    totalDepartments: 12,
    totalApplications: 456,
    confirmedApplications: 234,
    pendingApplications: 89,
    totalRevenue: 145000,
    applicationRate: 78.5,
  },
  STUDENT: {
    totalApplications: 3,
    confirmedApplications: 1,
    pendingApplications: 2,
    totalPaid: 15000,
    upcomingDeadlines: 2,
  },
}

function SuperAdminDashboard() {
  const stats = mockStats.SUPER_ADMIN

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Super Admin Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your university system.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Universities</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUniversities}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingApplications} pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest university applications submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Alice Johnson",
                  university: "Dhaka University",
                  department: "Computer Science",
                  status: "PENDING",
                },
                { name: "Bob Smith", university: "BUET", department: "Electrical Engineering", status: "CONFIRMED" },
                {
                  name: "Carol Davis",
                  university: "Chittagong University",
                  department: "Business Administration",
                  status: "WAITING",
                },
                { name: "David Wilson", university: "Rajshahi University", department: "Medicine", status: "PENDING" },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{application.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {application.university} - {application.department}
                    </p>
                  </div>
                  <Badge
                    variant={
                      application.status === "CONFIRMED"
                        ? "default"
                        : application.status === "PENDING"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Application Processing</span>
                <span>87%</span>
              </div>
              <Progress value={87} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Payment Success Rate</span>
                <span>94%</span>
              </div>
              <Progress value={94} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>System Uptime</span>
                <span>99.9%</span>
              </div>
              <Progress value={99.9} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UniversityAdminDashboard() {
  const stats = mockStats.UNIVERSITY_ADMIN

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">University Admin Overview</h2>
        <p className="text-muted-foreground">Manage your university's departments and applications.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDepartments}</div>
            <p className="text-xs text-muted-foreground">Across all faculties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingApplications} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmedApplications}</div>
            <p className="text-xs text-muted-foreground">{stats.applicationRate}% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Applications</CardTitle>
            <CardDescription>Applications by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Computer Science", applications: 89, capacity: 120 },
                { name: "Business Administration", applications: 76, capacity: 100 },
                { name: "Electrical Engineering", applications: 65, capacity: 80 },
                { name: "Medicine", applications: 156, capacity: 150 },
              ].map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{dept.name}</span>
                    <span>
                      {dept.applications}/{dept.capacity}
                    </span>
                  </div>
                  <Progress value={(dept.applications / dept.capacity) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New application received", time: "2 minutes ago", type: "application" },
                { action: "Department capacity updated", time: "1 hour ago", type: "update" },
                { action: "Notice published", time: "3 hours ago", type: "notice" },
                { action: "Payment confirmed", time: "5 hours ago", type: "payment" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StudentDashboard() {
  const stats = mockStats.STUDENT

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
        <p className="text-muted-foreground">Track your applications and manage your university admissions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Total submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmedApplications}</div>
            <p className="text-xs text-muted-foreground">Admission confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">Awaiting decision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{stats.totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Application fees</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Your university application status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { university: "Dhaka University", department: "Computer Science", status: "CONFIRMED", round: 1 },
                { university: "BUET", department: "Electrical Engineering", status: "PENDING", round: 1 },
                {
                  university: "Chittagong University",
                  department: "Business Administration",
                  status: "WAITING",
                  round: 2,
                },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{application.university}</p>
                    <p className="text-xs text-muted-foreground">{application.department}</p>
                    <p className="text-xs text-muted-foreground">Round {application.round}</p>
                  </div>
                  <Badge
                    variant={
                      application.status === "CONFIRMED"
                        ? "default"
                        : application.status === "PENDING"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Important dates to remember</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "BUET Application Deadline", date: "March 15, 2024", type: "deadline" },
                { title: "Admission Test - DU", date: "March 20, 2024", type: "exam" },
                { title: "Result Publication", date: "April 1, 2024", type: "result" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-3 w-3 rounded-full bg-orange-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  // In a real app, get this from auth context
  const user = useSelector(selectCurrentUser);

    // const currentRole = user?.role ;
    const currentRole : any = "UNIVERSITY_ADMIN" ;

  switch (currentRole) {
    case "SUPER_ADMIN":
      return <SuperAdminDashboard />
    case "UNIVERSITY_ADMIN":
      return <UniversityAdminDashboard />
    case "STUDENT":
      return <StudentDashboard />
    default:
      return <div>Access denied</div>
  }
}
