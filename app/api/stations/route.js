import dbConnect from "@/lib/dbConnect";
import Station from "@/models/Station";
import { NextResponse } from "next/server";

// Create a new station
export async function POST(req) {
  try {
    await dbConnect();
    const { name, location, maxEVs, availableSlots } = await req.json();

    if (!name || !location || !maxEVs || !availableSlots) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newStation = new Station({ name, location, maxEVs, availableSlots });
    await newStation.save();

    return NextResponse.json({ message: "Station created successfully", newStation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}

// Get all stations
export async function GET() {
  try {
    await dbConnect();
    const stations = await Station.find({});
    return NextResponse.json(stations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching stations" }, { status: 500 });
  }
}

