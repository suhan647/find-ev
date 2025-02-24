// "use client";
// import { useState } from "react";
// import AddUserForm from "./AddUserForm";
// import UserList from "./UserList";

// export default function UsersPage() {
//   const [refresh, setRefresh] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="p-6 mx-auto">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
//       {/* Add User Button */}
//       <button
//         onClick={openModal}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Add User
//       </button>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Add User</h2>
//             <AddUserForm 
//               onUserAdded={() => {
//                 setRefresh(!refresh);
//                 closeModal();
//               }} 
//             />
//             <button
//               onClick={closeModal}
//               className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* User List */}
//       <UserList key={refresh} />
//     </div>
//   );
// }




"use client";
import { useState } from "react";
import AddUserForm from "./AddUserForm";
import UserList from "./UserList";

export default function UsersPage() {
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 mx-auto max-w-3xl">
      {/* User Management Title */}
      <h1 className="text-2xl font-bold mb-4 text-left">User Management</h1>

      {/* Add User Button */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6 text-left"
      >
        Add User
      </button>

      {/* User List (Ensuring it's aligned to the left) */}
      <div className="w-full">
        <UserList key={refresh} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <AddUserForm 
              onUserAdded={() => {
                setRefresh(!refresh);
                closeModal();
              }} 
            />
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
