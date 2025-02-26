import dbConnect from "@/lib/dbConnect";
import Station from "@/models/Station";
import { NextResponse } from "next/server";

// Create a new station
export async function POST(req) {
  try {
    await dbConnect();

    let data;
    try {
      data = await req.json(); // Ensure request body is parsed properly
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
    }

    const { name, location, maxEVs, availableSlots, latitude, longitude } = data;

    // Validate required fields
    if (!name || !location || maxEVs === undefined || availableSlots === undefined || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Ensure numeric values
    const maxEVsNumber = Number(maxEVs);
    const availableSlotsNumber = Number(availableSlots);
    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);

    if (isNaN(maxEVsNumber) || isNaN(availableSlotsNumber) || isNaN(latitudeNumber) || isNaN(longitudeNumber)) {
      return NextResponse.json({ message: "maxEVs, availableSlots, latitude, and longitude must be numbers" }, { status: 400 });
    }

    const newStation = new Station({ 
      name, 
      location, 
      maxEVs: maxEVsNumber, 
      availableSlots: availableSlotsNumber, 
      latitude: latitudeNumber, 
      longitude: longitudeNumber 
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

