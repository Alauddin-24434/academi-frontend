"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type JwtPayload = {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  role: string; // e.g., 'student', 'teacher', 'admin'
  image?: string; // Optional field for user profile imag
};

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);

        // Optional: Store token in Redux or LocalStorage
        dispatch(
          setCredentials({
            token,
            user: {
              ...decoded,
              name: (decoded as JwtPayload).name || "", // Provide a fallback if name is missing
            },
          }),
        );
        // localStorage.setItem("accessToken", token);

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("❌ Invalid token", error);
      }
    }
  }, [token, dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <CardTitle>OAuth Login Successful 🎉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">You are being redirected...</p>
          <Loader2 className="mx-auto animate-spin text-blue-500" size={30} />
        </CardContent>
      </Card>
    </div>
  );
}
