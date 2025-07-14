"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";

type RegisterFormInputs = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: "STUDENT" | "UNIVERSITY_ADMIN";
  agreeToTerms: boolean;
};

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: "onTouched",
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Password and Confirm Password must match");
      return;
    }
    if (!data.agreeToTerms) {
      alert("You must agree to the terms");
      return;
    }

    

    try {
      const response = await registerUser(data);
      dispatch(
        setCredentials({
          token: response.data.accessToken,
          user: response.data.user,
        }),
      );
      alert("Registration successful");
      // redirect if needed
    } catch (error: unknown) {
      console.error("register failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join the University Admission Management system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
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

            <div className="space-y-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Register As</Label>
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select your role</option>
                <option value="STUDENT">Student</option>
                <option value="UNIVERSITY_ADMIN">University Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register("agreeToTerms", { required: true })}
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </Label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">You must agree to terms</p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
