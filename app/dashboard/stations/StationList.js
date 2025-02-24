// "use client";
// import { useEffect, useState } from "react";
// import { fetchStations, deleteStation } from "./api";
// import EditStationModal from "./EditStationModal";

// export default function StationList() {
//   const [stations, setStations] = useState([]);
//   const [editingStation, setEditingStation] = useState(null);

//   useEffect(() => {
//     loadStations();
//   }, []);

//   async function loadStations() {
//     const data = await fetchStations();
//     setStations(data);
//   }

//   async function handleDelete(id) {
//     await deleteStation(id);
//     loadStations();
//   }

//   return (
//     <div className="bg-white p-6 shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Stations</h2>
//       <ul>
//         {stations.map((station) => (
//           <li key={station._id} className="flex justify-between p-2 border-b">
//             <span>{station.name} - {station.location} - {station.availableSlots} slots</span>
//             <div>
//               <button onClick={() => setEditingStation(station)} className="text-blue-500 mr-3">Edit</button>
//               <button onClick={() => handleDelete(station._id)} className="text-red-500">Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {editingStation && (
//         <EditStationModal station={editingStation} onClose={() => setEditingStation(null)} onUpdated={loadStations} />
//       )}
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { fetchStations, deleteStation } from "./api";
import EditStationModal from "./EditStationModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";

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
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Charging Stations</h2>
      <ul className="divide-y divide-gray-200">
        {stations.map((station) => (
          <li
            key={station._id}
            className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition rounded-lg mt-2"
          >
            <div>
              <p className="text-lg font-semibold text-gray-900">{station.name}</p>
              <p className="text-gray-600 text-sm">{station.location} - {station.availableSlots} slots available</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setEditingStation(station)} 
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <FiEdit size={20} />
              </button>
              <button 
                onClick={() => handleDelete(station._id)} 
                className="text-red-500 hover:text-red-700 transition"
              >
                <FiTrash2 size={20} />
              </button>
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
