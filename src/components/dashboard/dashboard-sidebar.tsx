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
  { name: "Departments", href: "/dashboard/departments", icon: Building },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Notices", href: "/dashboard/notices", icon: Bell },
];

const universityAdminMenuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Departments", href: "/dashboard/departments", icon: Building2 },
  { name: "Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Notices", href: "/dashboard/notices", icon: Bell },
  { name: "Circulars", href: "/dashboard/circulars", icon: FileText },
];

const studentMenuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Applications", href: "/dashboard/applications", icon: FileText },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Notices", href: "/dashboard/notices", icon: Bell },
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
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
          <UniversityIcon className="h-8 w-8 text-[#bf9310]" />
          <span className="text-2xl font-bold text-yellow-500">UV</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{currentRole}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleBasedMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className="flex items-center gap-2">
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
