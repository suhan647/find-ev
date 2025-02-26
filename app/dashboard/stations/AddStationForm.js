"use client";
import { useState } from "react";
import { addStation } from "./api";

export default function AddStationForm({ onStationAdded }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [maxEVs, setMaxEVs] = useState("");
  const [availableSlots, setAvailableSlots] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newStation = await addStation({ name, location, maxEVs, availableSlots, latitude, longitude });

      onStationAdded(newStation);
    } catch (error) {
      console.error("Error adding station:", error);
    }

    // Clear form
    setName("");
    setLocation("");
    setMaxEVs("");
    setAvailableSlots("");
    setLatitude("");
    setLongitude("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Add New Station</h2>

      <input type="text" placeholder="Station Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Max EVs" value={maxEVs} onChange={(e) => setMaxEVs(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Available Slots" value={availableSlots} onChange={(e) => setAvailableSlots(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="border p-2 w-full mb-4" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Station</button>
    </form>
  );
}
