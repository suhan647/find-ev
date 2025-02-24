const API_URL = "https://3000-suhan647-findev-euwyfolx1va.ws-us117.gitpod.io/api/users"; // Update with actual URL

// Fetch all users
export async function fetchUsers() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createUser(userData) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  
    if (!res.ok) {
      console.error("Error creating user:", await res.json());
      throw new Error("Failed to create user");
    }
  
    return res.json();
  }

// Delete a user
export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
