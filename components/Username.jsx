"use client";
import { useUserStore } from "@/lib/store/user";
import React from "react";

const Username = () => {
  const username = useUserStore((s) => s.username) || "Guest";
  return (
    <div className="text-sm hidden font-semibold md:block text-[#a21caf]">
      {username}
    </div>
  );
};

export default Username;
