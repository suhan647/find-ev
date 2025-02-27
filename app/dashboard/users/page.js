"use client";
import { useState } from "react";
import AddUserForm from "./AddUserForm";
import UserList from "./UserList";
import { FiPlusCircle, FiX } from "react-icons/fi";

export default function UsersPage() {
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Manage your team members and their account permissions here</p>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-sm"
          >
            <FiPlusCircle size={18} />
            <span>Add User</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-1 sm:p-4">
            <UserList key={refresh} />
          </div>
        </div>
      </main>

      {/* Modal - Animated */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <AddUserForm 
                onUserAdded={() => {
                  setRefresh(!refresh);
                  closeModal();
                }} 
              />
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 pt-0">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add a custom animation for the modal */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}