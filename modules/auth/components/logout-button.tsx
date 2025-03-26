"use client";

import { logout } from "@/modules/auth/actions/logout";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      await logout();
      router.refresh(); // Force a router refresh
      router.replace("/auth/login"); // Use replace instead of push
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span 
      onClick={!isLoading ? onClick : undefined} 
      className={`cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
    >
      {isLoading ? "Cerrando sesión..." : children}
    </span>
  );
};
