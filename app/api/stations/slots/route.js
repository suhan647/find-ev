import dbConnect from "@/lib/dbConnect";
import Station from "@/models/Station";
import { NextResponse } from "next/server";

// Get Station Slot Availability
export async function GET(req) {
  try {
    await dbConnect();
    const stations = await Station.find().select("name availableSlots");

    return NextResponse.json(stations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
