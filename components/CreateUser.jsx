"use client";

import { useUserStore } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const setUsername = useUserStore((s) => s.setUsername);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setErr("Name must be at least 2 characters.");
      return;
    }
    setUsername(trimmed);
    router.push("/menu");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
      <p className="text-sm text-stone-600 md:text-base font-semibold">
        Welcome!!! Please start by telling us your name:
      </p>

      <Input
        placeholder="Your full name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (err) setErr("");
        }}
        className="w-72 border-[#ec4899] focus-visible:ring-2 focus-visible:ring-[#ec4899]"
      />

      {err && (
        <p className="text-xs text-red-600 bg-red-100 p-2 rounded">{err}</p>
      )}

      {name !== "" && (
        <div>
          <Button
            type="submit"
            className="bg-[#ec4899] hover:bg-[#a21caf] text-white"
          >
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
