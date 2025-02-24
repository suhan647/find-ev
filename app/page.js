"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/register");
    } else {
      router.push("/dashboard");
    }
  }, [user]);

  return <div>Loading...</div>;
}
