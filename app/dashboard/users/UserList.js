"use client";
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "./api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await fetchUsers();
    setUsers(data);
  }

  async function handleDelete(id) {
    await deleteUser(id);
    loadUsers(); // Refresh list after deletion
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul>
        {users.length > 0 ? users?.map((user) => (
          <li key={user._id} className="flex justify-between p-2 border-b">
            <span>{user.name} - {user.email}</span>
            <button onClick={() => handleDelete(user._id)} className="text-red-500">Delete</button>
          </li>
        )) : <div>No users</div>}
      </ul>
    </div>
  );
}
