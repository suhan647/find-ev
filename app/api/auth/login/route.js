import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Hardcoded user credentials
    if (email === "suhan@hbits.co" && password === "7204832004") {
      const res = NextResponse.json({ message: "Login successful" }, { status: 200 });

      // Set cookie for authentication
      res.cookies.set("user", email, { httpOnly: true, secure: true, path: "/" });

      return res;
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
