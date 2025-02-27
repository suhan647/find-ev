const API_URL = 'https://3000-suhan647-findev-nw0sycyb7z0.ws-us118.gitpod.io//api/stations'
// `${process.env.NEXT_PUBLIC_API_URL}/api/stations`;

// Fetch all stations
export async function fetchStations() {
  const res = await fetch(API_URL);
  return res.json();
}

// Add a new station
export async function addStation(stationData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stationData),
  });
  return res.json();
}

// Update station
export async function updateStation(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
}

// Delete a station
export async function deleteStation(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
