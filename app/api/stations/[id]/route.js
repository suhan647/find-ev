import dbConnect from "@/lib/dbConnect";
import Station from "@/models/Station";
import { NextResponse } from "next/server";

// Update (Edit) a station
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { name, location, maxEVs, availableSlots } = await req.json();

    if (!name || !location || !maxEVs || !availableSlots) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const updatedStation = await Station.findByIdAndUpdate(id, { name, location, maxEVs, availableSlots }, { new: true });

    if (!updatedStation) {
      return NextResponse.json({ message: "Station not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Station updated successfully", updatedStation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}

// Delete a station
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedStation = await Station.findByIdAndDelete(id);

    if (!deletedStation) {
      return NextResponse.json({ message: "Station not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Station deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
