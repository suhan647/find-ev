const API_URL = 'https://3000-suhan647-findev-zf3g81tii34.ws-us118.gitpod.io/api/users'
// `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

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
export async function deleteUser(userId) {
    const res = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      console.error("Error deleting user:", await res.json());
      throw new Error("Failed to delete user");
    }
  
    return res.json();
  }
  
