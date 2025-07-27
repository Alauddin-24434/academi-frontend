"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,

} from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { catchAsync } from "@/middleware/catchAsync";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const handleSubmit = catchAsync(async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await loginUser({ email, password }).unwrap();
    if (res?.success === true) {
      dispatch(
        setUser({
          user: res?.data?.user,
          token: res?.data?.accessToken,
        })
      );
    }

    router.replace(redirectTo);

  })

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-teal-700 hover:text-teal-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-white border border-teal-600 shadow-lg rounded-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-teal-700 text-2xl font-bold">Akademi</span>
            </div>

            <CardDescription className="text-teal-600">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-teal-900">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-teal-400 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-teal-900">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-teal-400 pr-10 focus:ring-teal-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-800"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Login
              </Button>
            </form>

            {/* Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-sm text-teal-700">
                {"Don't have an account? "}
                <Link
                  href="/admission"
                  className="text-teal-600 hover:underline font-medium"
                >
                  Admission
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
        <Toaster position="top-center" />
    </div>
  );
}
