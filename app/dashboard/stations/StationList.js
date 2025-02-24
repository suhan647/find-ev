"use client";
import { useEffect, useState } from "react";
import { fetchStations, deleteStation } from "./api";
import EditStationModal from "./EditStationModal";

export default function StationList() {
  const [stations, setStations] = useState([]);
  const [editingStation, setEditingStation] = useState(null);

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    const data = await fetchStations();
    setStations(data);
  }

  async function handleDelete(id) {
    await deleteStation(id);
    loadStations();
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Stations</h2>
      <ul>
        {stations.map((station) => (
          <li key={station._id} className="flex justify-between p-2 border-b">
            <span>{station.name} - {station.location} - {station.availableSlots} slots</span>
            <div>
              <button onClick={() => setEditingStation(station)} className="text-blue-500 mr-3">Edit</button>
              <button onClick={() => handleDelete(station._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingStation && (
        <EditStationModal station={editingStation} onClose={() => setEditingStation(null)} onUpdated={loadStations} />
      )}
    </div>
  );
}
