import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, stationId, date } = await req.json();

    if (!userId || !stationId || !date) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newBooking = new Booking({ userId, station: stationId, date });
    await newBooking.save();

    return NextResponse.json({ message: "Slot booked successfully", newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}


export async function GET(req) {
    try {
      await dbConnect();
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");
  
      if (!userId) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
      }
  
      const bookings = await Booking.find({ userId }).populate("station");
  
      return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Server Error", error }, { status: 500 });
    }
  }
  