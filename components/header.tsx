"use client";

import { Search, Bell, Settings, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserByUserIdQuery } from "@/redux/features/auth/authApi";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const user = useSelector(selectCurrentUser);
  const userId = user?.id as string;

  const { data: userData } = useGetUserByUserIdQuery(userId);
  const fullName = userData?.data?.student?.fullName ?? "Loading...";
  const role = userData?.data?.role ?? "";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search here..."
            className="w-80 pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Message icon */}
        <Button variant="ghost" size="icon" className="relative">
          <MessageCircle className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></span>
        </Button>

        {/* Bell icon */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </Button>

      

        {/* User Info + Avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium">{fullName}</div>
            <div className="text-xs text-gray-500">{role}</div>
          </div>
          <Avatar>
            <AvatarImage
              src={
                userData?.data?.student?.passportPhoto ||
                "/placeholder.svg?height=40&width=40"
              }
              alt="User"
            />
            <AvatarFallback>
              {fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
