"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useSignUpUserMutation } from "@/redux/features/auth/authApi"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/features/auth/authSlice"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignUpPage() {
  const [signUpUser] = useSignUpUserMutation()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signUpUser(formData).unwrap()
      if (res?.success === true) {
        dispatch(
          setUser({
            user: res?.data?.user,
            token: res?.data?.accessToken,
          })
        )
      }
      router.replace(redirectTo);
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-teal-200 hover:text-teal-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-teal-800/20 backdrop-blur-md border border-teal-600 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">

              <span className="text-white text-2xl font-bold">Akademi</span>
            </div>
            <CardTitle className="text-white text-2xl">Create Account</CardTitle>
            <CardDescription className="text-teal-200">
              Join Akademi to manage your educational institution
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-teal-600/10 border-teal-500 text-white placeholder:text-teal-200"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="bg-teal-600/10 border-teal-500 text-white placeholder:text-teal-200 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-300 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-teal-100">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-teal-400 hover:text-teal-500 font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
