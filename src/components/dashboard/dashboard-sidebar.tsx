"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import {
  LayoutDashboard,
  School,
  Building,
  Building2,
  Users,
  FileText,
  CreditCard,
  Bell,
  UniversityIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

// ================= Role-Based Menu Items ===================
const superAdminMenuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Universities", href: "/dashboard/universities", icon: School },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Applications", href: "/dashboard/applications", icon: FileText },
    { name: "Departments", href: "/dashboard/global-departments", icon: Building2 },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Circulars", href: "/dashboard/circulars", icon: FileText },
];

const universityAdminMenuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Departments", href: "/dashboard/university-departments", icon: Building2 },
  { name: "Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Notices", href: "/dashboard/notices", icon: Bell },

];

const studentMenuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },

];

const DashboardSidebar = () => {
  const user = useSelector(selectCurrentUser);
  const currentRole = user?.role;

  if (!currentRole) {
    return (
      <div className="text-center p-4 text-red-500">
        Access Denied: No user role found
      </div>
    );
  }

  let roleBasedMenuItems = [];

  switch (currentRole) {
    case "SUPER_ADMIN":
      roleBasedMenuItems = superAdminMenuItems;
      break;
    case "UNIVERSITY_ADMIN":
      roleBasedMenuItems = universityAdminMenuItems;
      break;
    case "STUDENT":
      roleBasedMenuItems = studentMenuItems;
      break;
    default:
      return (
        <div className="text-center p-4 text-red-500">
          Access Denied: Unknown role
        </div>
      );
  }

  return (
    <Sidebar className="bg-gradient-to-b from-[#1a1c2b] to-[#12131b] text-black shadow-lg h-screen">
      <SidebarHeader className="p-4 border-b border-gray-700">
        <Link href="/" className="flex items-center space-x-3">
          <UniversityIcon className="h-8 w-8 text-yellow-400" />
          <span className="text-xl font-extrabold text-yellow-400 tracking-wide">
            UV Portal
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm uppercase text-black tracking-wider px-2">
            {currentRole.replace("_", " ")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {roleBasedMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-colors duration-200 text-sm font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
