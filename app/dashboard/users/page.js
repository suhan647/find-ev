"use client";
import { useState } from "react";
import AddUserForm from "./AddUserForm";
import UserList from "./UserList";

export default function UsersPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <AddUserForm onUserAdded={() => setRefresh(!refresh)} />
      <UserList key={refresh} />
    </div>
  );
}
