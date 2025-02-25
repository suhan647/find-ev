"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "./globals.css";


function AuthCheck({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user && !window.location.pathname.includes("/login")) {
  //     router.push("/login"); // Redirect to login if user is not logged in
  //   }
  // }, [user, router]);

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <AuthCheck>{children}</AuthCheck>
        </body>
      </html>
    </AuthProvider>
  );
}
