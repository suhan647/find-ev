"use client";
import { useState } from "react";
import { addStation } from "./api";

export default function AddStationForm({ onStationAdded }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [maxEVs, setMaxEVs] = useState("");
  const [availableSlots, setAvailableSlots] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !location || !maxEVs || !availableSlots) {
      alert("All fields are required");
      return;
    }

    await addStation({ name, location, maxEVs, availableSlots });
    onStationAdded(); // Refresh list after adding

    // Clear form
    setName("");
    setLocation("");
    setMaxEVs("");
    setAvailableSlots("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Station</h2>

      <input type="text" placeholder="Station Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-3" />
      
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full mb-3" />
      
      <input type="number" placeholder="Max EVs" value={maxEVs} onChange={(e) => setMaxEVs(e.target.value)} className="border p-2 w-full mb-3" />
      
      <input type="number" placeholder="Available Slots" value={availableSlots} onChange={(e) => setAvailableSlots(e.target.value)} className="border p-2 w-full mb-3" />
      
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
