"use client";
import { useEffect, useState } from "react";
import { fetchStations, deleteStation } from "./api";

export default function StationList() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    const data = await fetchStations();
    setStations(data);
  }

  async function handleDelete(id) {
    await deleteStation(id);
    loadStations(); // Refresh list after deletion
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Stations</h2>
      <ul>
        {stations.map((station) => (
          <li key={station._id} className="flex justify-between p-2 border-b">
            <span>{station.name} - {station.slots} slots</span>
            <button onClick={() => handleDelete(station._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
