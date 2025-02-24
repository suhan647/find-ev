"use client";
import { useEffect, useState } from "react";
import AddStationForm from "./AddStationForm";
import StationList from "./StationList";
import { fetchStations, addStation } from "./api";

export default function StationsPage() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    try {
      const data = await fetchStations();
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  }

  async function handleStationAdded(newStation) {
    // ✅ Update state immediately
    setStations((prevStations) => [...prevStations, newStation]);

    // ✅ Fetch latest data from API (optional)
    await loadStations();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stations</h1>
      
      {/* Pass the function properly */}
      <AddStationForm onStationAdded={handleStationAdded} />
      
      <StationList stations={stations} />
    </div>
  );
}
