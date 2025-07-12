
"use client";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function OAuthError() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center border border-red-300">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-600 w-12 h-12 animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold text-red-700 mb-2">OAuth Login Failed</h1>
        <p className="text-red-600 font-medium mb-4">Status Code: {status}</p>
        <p className="text-gray-700 text-sm">{message || "An unknown error occurred during login."}</p>

        <a
          href="/login"
          className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}
