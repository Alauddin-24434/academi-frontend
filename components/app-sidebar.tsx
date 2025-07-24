"use client"

import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  UtensilsCrossed,
  User,
  MessageCircle,
  Activity,
  LayoutDashboard,
  User2,
  BookOpenCheck,
  CreditCard,
  Bell,
} from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"
// import { useSelector } from "react-redux";
// import { selectUser } from "@/redux/features/auth/authSlice";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"

// Role wise menu items
const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Students", url: "/dashboard/students", icon: Users },
  { title: "Teachers", url: "/dashboard/teachers", icon: GraduationCap },
  { title: "Event", url: "/dashboard/events", icon: Calendar },
  { title: "Finance", url: "/dashboard/finance", icon: DollarSign },
  { title: "Food", url: "/dashboard/food", icon: UtensilsCrossed },
  { title: "User", url: "/dashboard/user", icon: User },
  { title: "Chat", url: "/dashboard/chat", icon: MessageCircle },
  { title: "Latest Activity", url: "/dashboard/activity", icon: Activity },
]

const teacherMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Event", url: "/dashboard/events", icon: Calendar },
  { title: "Chat", url: "/dashboard/chat", icon: MessageCircle },
]

const studentMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/dashboard/student/profile", icon: User2 },
  { title: "Join Requests", url: "/dashboard/student/group-join-requests", icon: BookOpenCheck },
  { title: "Messages", url: "/dashboard/student/messages", icon: MessageCircle },
  { title: "Payments", url: "/dashboard/student/payments", icon: CreditCard },
  { title: "Academic Info", url: "/dashboard/student/academic", icon: GraduationCap },
  { title: "Notices / Announcements", url: "/dashboard/student/notices", icon: Bell },
  { title: "Admission", url: "/dashboard/admission", icon: GraduationCap },
]

export function AppSidebar() {
  const pathname = usePathname()
  const user = useSelector(selectCurrentUser)
  const role =user?.role;

  let menuItems: any = []

  if (role === "ADMIN") {
    menuItems = adminMenuItems
  } else if (role === "TEACHER") {
    menuItems = teacherMenuItems
  } else if (role === "STUDENT") {
    menuItems = studentMenuItems
  }

  return (
    <Sidebar className="border-r-0">
      <div className="flex h-full w-full flex-col bg-teal-600">
        <SidebarHeader className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold text-white">Akademi</span>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 p-4">
          <SidebarMenu className="space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  className="w-full justify-start gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white"
                >
                  <Link href={item.url}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-white/10 p-4">
          <div className="text-xs text-white/60">
            <div className="font-medium">Akademi - School Admission Dashboard</div>
            <div className="mt-1">Made with ❤️ by Peterdraw</div>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  )
}
