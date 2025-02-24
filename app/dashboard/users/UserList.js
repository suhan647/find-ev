// "use client";
// import { useEffect, useState } from "react";
// import { fetchUsers, deleteUser } from "./api";

// export default function UserList() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   async function loadUsers() {
//     const data = await fetchUsers();
//     setUsers(data);
//   }

//   async function handleDelete(id) {
//     await deleteUser(id);
//     loadUsers(); // Refresh list after deletion
//   }

//   return (
//     <div className="bg-white p-6 shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Users</h2>
//       <ul>
//         {users.length > 0 ? users?.map((user) => (
//           <li key={user._id} className="flex justify-between p-2 border-b">
//             <span>{user.name} - {user.email}</span>
//             <button onClick={() => handleDelete(user._id)} className="text-red-500">Delete</button>
//           </li>
//         )) : <div>No users</div>}
//       </ul>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "./api";
import { FaUsers, FaTrashAlt, FaUserTimes, FaSpinner, FaTimes } from "react-icons/fa";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      setDeleteLoading(id);
      await deleteUser(id);
      await loadUsers();
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setDeleteLoading(null);
    }
  }

  function openDeleteModal(user) {
    setUserToDelete(user);
    setShowDeleteModal(true);
  }

  // Delete Confirmation Modal
  const DeleteModal = ({ user, onClose, onDelete, isLoading }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-semibold mb-2">Delete User</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete {user.name}? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(user._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center min-w-[80px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FaUsers className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Users</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : users.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between py-4 px-2 group hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => openDeleteModal(user)}
                  className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                >
                  <FaTrashAlt className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <FaUserTimes className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No users found</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <DeleteModal
          user={userToDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
          onDelete={handleDelete}
          isLoading={deleteLoading === userToDelete._id}
        />
      )}
    </div>
  );
}