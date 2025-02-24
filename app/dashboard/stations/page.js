"use client";
import { useState } from "react";
import AddStationForm from "./AddStationForm";
import StationList from "./StationList";

export default function StationsPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Station Management</h1>
      <AddStationForm onStationAdded={() => setRefresh(!refresh)} />
      <StationList key={refresh} />
    </div>
  );
}
