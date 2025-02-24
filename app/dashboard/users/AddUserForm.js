"use client";
import { useState } from "react";
import { createUser } from "./api";

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password field
  const [role, setRole] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("All fields are required");
      return;
    }

    await createUser({ name, email, password, role });
    onUserAdded(); // Refresh list after adding

    // Clear form
    setName("");
    setEmail("");
    setPassword(""); // Clear password field
    setRole("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add User</h2>

      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="border p-2 w-full mb-3" 
      />

      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="border p-2 w-full mb-3" 
      />

      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="border p-2 w-full mb-3" 
      />

      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        className="border p-2 w-full mb-3"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
