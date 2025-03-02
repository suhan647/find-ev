import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" });
  res.cookies.set("token", "", { expires: new Date(0), path: "/" }); // Clear cookie
  return res;
}
