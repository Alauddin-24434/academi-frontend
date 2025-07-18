import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Phone, Mail, MoreHorizontal, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const students = [
  {
    name: "Samantha William",
    id: "#123456789",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Tony Soap",
    id: "#123456789",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Karen Hope",
    id: "#123456789",
    date: "March 25, 2021",
    parent: "Justin Hope",
    city: "Jakarta",
    grade: "VII C",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jordan Nico",
    id: "#123456789",
    date: "March 25, 2021",
    parent: "Amanda Nico",
    city: "Jakarta",
    grade: "VII A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nadila Adja",
    id: "#123456789",
    date: "March 25, 2021",
    parent: "Jack Adja",
    city: "Jakarta",
    grade: "VII A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Johnny Ahmad",
    id: "#123456789",
    date: "March 25, 2021",
    parent: "Danny Ahmad",
    city: "Jakarta",
    grade: "VII A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Students() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Students" />

      <div className="p-6">
        <Card className="akademi-card">
          <CardContent className="p-6">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search here..." className="w-80 pl-10 bg-gray-50 border-gray-200" />
              </div>

              <div className="flex items-center gap-3">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                    <ChevronDown className="h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-[#6366F1] hover:bg-[#5856EB] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Student
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <Checkbox />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Parent Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">City</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Grade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Checkbox />
                      </td>
                      <td className="py-4 px-4">
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
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#6366F1] font-medium">{student.id}</td>
                      <td className="py-4 px-4 text-gray-600">{student.date}</td>
                      <td className="py-4 px-4 text-gray-600">{student.parent}</td>
                      <td className="py-4 px-4 text-gray-600">{student.city}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={
                            student.grade === "VII A"
                              ? "bg-orange-100 text-orange-800"
                              : student.grade === "VII B"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {student.grade}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">Showing 1-5 from 100 data</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="default" size="sm" className="bg-[#6366F1]">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
