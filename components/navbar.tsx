"use client";
import { UserButton } from "@/modules/profile/components/user-button";
import { MainNav } from "@/components/main-nav";

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="text-2xl font-bold">Medicloud</div>
        <MainNav />

        <UserButton />
      </div>
    </div>
  );
};
