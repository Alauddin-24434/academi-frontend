import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Mail, Phone, MapPin } from "lucide-react"

const contacts = [
  { name: "Samantha William", class: "Class VII A", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Tony Soap", class: "Class VII A", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Karen Hope", class: "Class VII A", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Jordan Nico", class: "Class VII B", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Nadila Adja", class: "Class VII C", avatar: "/placeholder.svg?height=40&width=40" },
]

const messages = [
  {
    name: "Samantha William",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
  {
    name: "Tony Soap",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
  {
    name: "Karen Hope",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: false,
  },
  {
    name: "Jordan Nico",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: true,
  },
  {
    name: "Nadila Adja",
    message: "Lorem ipsum dolor sit amet...",
    time: "12:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: false,
  },
]

const activities = [
  {
    user: "Karen Hope",
    action: 'moved task "User Research" from On Progress to Done',
    time: "2 March 2021, 13:45 PM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Samantha William",
    action: 'add new 4 attached files on task "Photo Assets"',
    time: "2 March 2021, 13:45 PM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Tony Soap",
    action: 'invite you in task "Wireframing" and "Hi-fidelity"',
    time: "2 March 2021, 13:45 PM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Samantha William",
    action: "created new Task",
    time: "2 March 2021, 13:45 PM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="User Dashboard" />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Profile Card */}
            <Card className="akademi-card overflow-hidden">
              <div className="h-32 akademi-gradient relative">
                <div className="absolute -bottom-10 left-6">
                  <Avatar className="w-20 h-20 border-4 border-white">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="pt-12 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Nabila Azalea</h2>
                    <p className="text-gray-600">Admin</p>
                    <div className="flex items-center gap-1 mt-2 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>Jakarta, Indonesia</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <span className="text-xl">⋯</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Phone className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+12 345 6789 0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <Mail className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">jordan@mail.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacts and Messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contacts */}
              <Card className="akademi-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Contacts</CardTitle>
                    <p className="text-sm text-gray-500">You have 741 contacts</p>
                  </div>
                  <Button size="icon" className="bg-[#6366F1] text-white rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search here..." className="pl-10" />
                  </div>

                  <div className="space-y-3">
                    {contacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.class}</p>
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
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search here..." className="pl-10" />
                  </div>

                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={message.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {message.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {message.unread && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                          )}
                        </div>
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
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Your Plan */}
            <Card className="akademi-card overflow-hidden">
              <div className="h-24 akademi-gradient relative">
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="text-white">
                    <span className="text-xl">⋯</span>
                  </Button>
                </div>
              </div>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Your Plan</p>
                  <h3 className="text-2xl font-bold">Free</h3>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">50 GB Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Limited Features</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Upgrade to Premium Plan to get more Features & Storage memory.
                </p>

                <Button className="w-full bg-[#6366F1] hover:bg-[#5856EB]">Upgrade Plan</Button>
              </CardContent>
            </Card>

            {/* Latest Activity */}
            <Card className="akademi-card">
              <CardHeader>
                <CardTitle>Latest Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
