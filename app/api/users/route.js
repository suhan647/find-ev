import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Get all users (Check registered users)
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
  }
}


// Create User

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();

    // Check if all fields are provided
    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully", newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
  }
}


// // Delete User
// export async function DELETE(req, { params }) {
//   try {
//     await dbConnect();
//     const { id } = params; // Get user ID from URL params

//     if (!id) {
//       return NextResponse.json({ message: "User ID is required" }, { status: 400 });
//     }

//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return NextResponse.json({ message: "Server error", error }, { status: 500 });
//   }
// }
