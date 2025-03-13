"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogin = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      router.prefetch("/auth/login");
      router.replace("/auth/login");
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = "/auth/login";
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-blue-600 text-2xl">⚕️ MediCloud</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-600 hover:text-blue-600"
              >
                Services
              </Link>
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <div className="space-y-6 text-center">
          <h1
            className={cn(
              "text-6xl font-semibold text-white drop-shadow-md",
              font.className
            )}
          >
            Healthcare Management System
          </h1>
          <p className="text-xl text-white">
            Streamline your medical practice with our secure platform
          </p>
          <div className="space-x-4">
            <Button
              variant="secondary"
              size="lg"
              className="hover:scale-105 transition-transform"
              onClick={handleLogin}
              disabled={isNavigating}
            >
              {isNavigating ? "Redirecting..." : "Get Started"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
