import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, GraduationCap, Calendar, UtensilsCrossed, Mail, MoreHorizontal } from "lucide-react"
import Image from "next/image"

const stats = [
  { title: "Students", value: "932", icon: Users, color: "bg-blue-500" },
  { title: "Teachers", value: "754", icon: GraduationCap, color: "bg-orange-500" },
  { title: "Events", value: "40", icon: Calendar, color: "bg-yellow-500" },
  { title: "Foods", value: "32k", icon: UtensilsCrossed, color: "bg-purple-600" },
]

const recentStudents = [
  { name: "Samantha William", class: "Class VII A", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Tony Soap", class: "Class VII A", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Karen Hope", class: "Class VII A", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Jordan Nico", class: "Class VII B", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Nadila Adja", class: "Class VII B", avatar: "/placeholder.svg?height=40&width=40" },
]

const messages = [
  {
    name: "Samantha William",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Tony Soap",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jordan Nico",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nadila Adja",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const unpaidStudents = [
  { name: "Samantha William", id: "ID 123456789", class: "VII A", amount: "$50,036", status: "Complete" },
  { name: "Tony Soap", id: "ID 123456789", class: "VII A", amount: "$50,036", status: "Pending" },
  { name: "Jordan Nico", id: "ID 123456789", class: "VII A", amount: "$50,036", status: "Canceled" },
  { name: "Karen Hope", id: "ID 123456789", class: "VII A", amount: "$50,036", status: "Complete" },
  { name: "Nadila Adja", id: "ID 123456789", class: "VII C", amount: "$50,036", status: "Complete" },
]

const foodMenu = [
  {
    name: "Beef Steak with Fried Potato",
    description: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Pancake with Honey",
    description: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Japanese Beef Ramen",
    description: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Dashboard" />

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="akademi-card">
              <CardContent className="flex items-center p-6">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* School Performance Chart */}
            <Card className="akademi-card">
              <CardHeader>
                <CardTitle>School Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Performance Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            {/* Calendar and Finance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="akademi-card">
                <CardHeader>
                  <CardTitle>School Calendar</CardTitle>
                  <p className="text-sm text-gray-500">March 2021</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="p-2 font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => (
                      <div key={i} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                        {i > 6 && i < 32 ? i - 6 : ""}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="akademi-card">
                <CardHeader>
                  <CardTitle>School Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Finance Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Unpaid Student Intuition */}
            <Card className="akademi-card">
              <CardHeader>
                <CardTitle>Unpaid Student Intuition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unpaidStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Class {student.class}
                        </Badge>
                        <span className="font-medium">{student.amount}</span>
                        <Badge
                          variant={
                            student.status === "Complete"
                              ? "default"
                              : student.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            student.status === "Complete"
                              ? "bg-green-100 text-green-800"
                              : student.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {student.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Students */}
            <Card className="akademi-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Students</CardTitle>
                <Button variant="ghost" size="icon" className="bg-[#6366F1] text-white rounded-full">
                  <span className="text-lg">+</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.class}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4 text-[#6366F1]">
                  View More
                </Button>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="akademi-card">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {message.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{message.name}</p>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4 text-[#6366F1]">
                  View More
                </Button>
              </CardContent>
            </Card>

            {/* Current Foods Menu */}
            <Card className="akademi-card">
              <CardHeader>
                <CardTitle>Current Foods Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {foodMenu.map((food, index) => (
                    <div key={index} className="flex gap-3">
                      <Image
                        src={food.image || "/placeholder.svg"}
                        alt={food.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{food.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{food.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4 text-[#6366F1]">
                  View More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
