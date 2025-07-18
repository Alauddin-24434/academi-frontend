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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Teachers",
    url: "/teachers",
    icon: GraduationCap,
  },
  {
    title: "Event",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Finance",
    url: "/finance",
    icon: DollarSign,
  },
  {
    title: "Food",
    url: "/food",
    icon: UtensilsCrossed,
  },
  {
    title: "User",
    url: "/user",
    icon: User,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Latest Activity",
    url: "/activity",
    icon: Activity,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0">
      <div className="flex h-full w-full flex-col bg-[#6366F1]">
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
