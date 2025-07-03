"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { setCredentials } from "@/redux/features/auth/authSlice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Github } from "lucide-react";
import Link from "next/link";

import { useLoginUserMutation } from "@/redux/features/auth/authApi";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(
        setCredentials({
          token: response.data.accessToken,
          user: response.data.user,
        }),
      );
      alert("Login successful");
    } catch (error: unknown) {
      console.error("Login failed:", error);
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    if (provider === "google") {
      window.location.href = "http://localhost:5000/api/users/google/login";
    } else if (provider === "github") {
      window.location.href = "http://localhost:5000/api/users/github/login";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Github className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your University Admission Management account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => handleOAuth("google")}
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => handleOAuth("github")}
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-2">
            {"Don't have an account? "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
