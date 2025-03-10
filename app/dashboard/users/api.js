const API_URL = 'http://localhost:3000/api/users'
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
  
