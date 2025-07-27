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
  const fullName = userData?.data?.fullName ?? "Loading...";
  const role = userData?.data?.role ?? "";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">

     
      

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
