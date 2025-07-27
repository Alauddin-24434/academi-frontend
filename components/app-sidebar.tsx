"use client";

import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  MessageCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice";

// Role wise menu items
const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Teachers", url: "/dashboard/admin/teachers", icon: GraduationCap },
  { title: "Students", url: "/dashboard/admin/students", icon: Users },
  { title: "Events", url: "/dashboard/admin/events", icon: Calendar },
  { title: "Faculty & Departments", url: "/dashboard/admin/facultyDepartments", icon: Calendar },
];

const teacherMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Events", url: "/dashboard/events", icon: Calendar },
  // { title: "Chat", url: "/dashboard/chat", icon: MessageCircle },
];

const studentMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Admission & Profile", url: "/dashboard/student/admission", icon: GraduationCap },
  // { title: "Messages", url: "/dashboard/student/messages", icon: MessageCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const role = user?.role;

  let menuItems: any = [];

  if (role === "ADMIN") menuItems = adminMenuItems;
  else if (role === "TEACHER") menuItems = teacherMenuItems;
  else if (role === "STUDENT") menuItems = studentMenuItems;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/"); // redirect after logout
  };

  return (
    <Sidebar className="border-r-0">
      <div className="flex h-full w-full flex-col bg-white shadow-sm">
        {/* Sidebar Header with / link */}
        <SidebarHeader className="border-b border-white/10 p-6">
          <Link href="/" className="flex items-center justify-center gap-3">
            <span className="text-xl font-bold text-teal-700 hover:underline">
              Akademi
            </span>
          </Link>
        </SidebarHeader>

        {/* Sidebar Content with menu items */}
        <SidebarContent className="flex-1 p-4">
          <SidebarMenu className="space-y-2">
            {menuItems.map((item:any) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  className="w-full justify-start gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-teal-700 hover:text-white data-[active=true]:bg-teal-600 data-[active=true]:text-white transition"
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

        {/* Sidebar Footer with logout */}
        <SidebarFooter className="border-t border-white/10 p-4 mb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
