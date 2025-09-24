"use client";
import { useUserStore } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import CreateUser from "./CreateUser";

const HomeClient = () => {
  const router = useRouter();
  const username = useUserStore((s) => s.username);
  if (username) {
    return (
      <Button
        onClick={() => router.push("/menu")}
        className="bg-[#ec4899] hover:bg-[#a21caf] text-white font-poppins"
      >
        Continue ordering, {username}
      </Button>
    );
  }
  return <CreateUser />;
};

export default HomeClient;
