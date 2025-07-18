import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Phone, Mail, MoreHorizontal, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const teachers = [
  { name: "Dimitres Viga", subject: "Mathematics", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Tom Housenburg", subject: "Science", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Dana Benevista", subject: "Art", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Salvadore Morbeau", subject: "Biology", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Maria Historia", subject: "History", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Jack Sally", subject: "Physics", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Lula Beatrice", subject: "Algorithm", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Nella Vita", subject: "English", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Nadia Laravela", subject: "Programming", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Dakota Farral", subject: "Science", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Miranda Adila", subject: "Art", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Indiana Barker", subject: "Biology", avatar: "/placeholder.svg?height=80&width=80" },
]

export default function Teachers() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Teachers" />

      <div className="p-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search here..." className="w-80 pl-10 bg-white border-gray-200" />
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

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <Card key={index} className="akademi-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <h3 className="font-semibold text-lg mb-1">{teacher.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{teacher.subject}</p>

                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white bg-transparent"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white bg-transparent"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
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
      </div>
    </div>
  )
}
