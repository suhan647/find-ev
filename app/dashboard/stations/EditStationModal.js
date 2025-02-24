"use client";
import { useState } from "react";
import { updateStation } from "./api";

export default function EditStationModal({ station, onClose, onUpdated }) {
  const [name, setName] = useState(station.name);
  const [location, setLocation] = useState(station.location);
  const [maxEVs, setMaxEVs] = useState(station.maxEVs);
  const [availableSlots, setAvailableSlots] = useState(station.availableSlots);

  async function handleSubmit(e) {
    e.preventDefault();

    await updateStation(station._id, { name, location, maxEVs, availableSlots });
    onUpdated();
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Station</h2>

        <input type="text" placeholder="Station Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-3" />
        
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full mb-3" />
        
        <input type="number" placeholder="Max EVs" value={maxEVs} onChange={(e) => setMaxEVs(e.target.value)} className="border p-2 w-full mb-3" />
        
        <input type="number" placeholder="Available Slots" value={availableSlots} onChange={(e) => setAvailableSlots(e.target.value)} className="border p-2 w-full mb-3" />
        
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        <button onClick={onClose} className="ml-2 text-gray-500">Cancel</button>
      </div>
    </div>
  );
}
