import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // Get token from cookies
    const token = req.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 }); // Return null instead of 401
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return NextResponse.json({ user: decoded }, { status: 200 });

  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return NextResponse.json({ user: null }, { status: 200 }); // Return null instead of error
  }
}
