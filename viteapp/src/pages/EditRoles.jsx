import React, { useState } from "react";
import { NavBar } from "../components";

function EditRoles() {
  const [members, setMembers] = useState([
    { id: 1, first_name: "John", last_name: "Doe", role: "Admin" },
    { id: 2, first_name: "Jane", last_name: "Smith", role: "User" },
    { id: 3, first_name: "Alice", last_name: "Johnson", role: "Moderator" },
    { id: 4, first_name: "Bob", last_name: "Brown", role: "User" },
  ]);

  const [showActions, setShowActions] = useState(true); // Set this to false to hide buttons

  const handleEditRole = (id) => {
    // Implement edit role functionality here
    console.log("Edit role for member ID:", id);
  };

  const handleDeleteAccount = (id) => {
    // Implement delete account functionality here
    console.log("Delete account for member ID:", id);
  };

  return (
    <div className="h-screen flex flex-col bg-white text-black">
      <NavBar />
      <div className="flex-grow w-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold my-8">Edit Roles</h1>
        <table className="table-auto w-3/4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              {showActions && <th className="border border-gray-300 px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-4 py-2">{member.first_name}</td>
                <td className="border border-gray-300 px-4 py-2">{member.last_name}</td>
                <td className="border border-gray-300 px-4 py-2">{member.role}</td>
                {showActions && (
                  <td className="border border-gray-300 px-4 py-2">
                    <button 
                      onClick={() => handleEditRole(member.id)} 
                      className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit Role
                    </button>
                    <button 
                      onClick={() => handleDeleteAccount(member.id)} 
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete Account
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditRoles;
