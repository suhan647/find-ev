import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; // Extract ID from the URL

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
