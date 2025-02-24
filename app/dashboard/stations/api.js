const API_URL = "https://3000-suhan647-findev-euwyfolx1va.ws-us117.gitpod.io/api/stations"; // Update with actual URL

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

// Delete a station
export async function deleteStation(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete station");
    }
  
    return res.json();
  }
  