import dbConnect from "@/lib/dbConnect";
import Station from "@/models/Station";
import { NextResponse } from "next/server";

// Create a new station
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    const { name, location, maxEVs, availableSlots, latitude, longitude, booked = false } = data;

    if (!name || !location || maxEVs === undefined || availableSlots === undefined || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newStation = new Station({
      name,
      location,
      maxEVs: Number(maxEVs),
      availableSlots: Number(availableSlots),
      latitude: Number(latitude),
      longitude: Number(longitude),
      booked: Boolean(booked),
    });

    await newStation.save();
    return NextResponse.json({ message: "Station created successfully", station: newStation }, { status: 201 });

  } catch (error) {
    console.error("Error creating station:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}


// Get all stationsStationSchema
export async function GET() {
  try {
    await dbConnect();
    const stations = await Station.find({});
    return NextResponse.json(stations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching stations" }, { status: 500 });
  }
}

