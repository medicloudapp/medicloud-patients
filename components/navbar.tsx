"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/modules/profile/components/user-button";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4  w-full shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/results" ? "default" : "outline"}
        >
          <Link href="/results">Results</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/profile" ? "default" : "outline"}
        >
          <Link href="/profile">Profile</Link>
        </Button>
        <Button asChild variant={pathname === "/scan" ? "default" : "outline"}>
          <Link href="/scan">Scan QR</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
