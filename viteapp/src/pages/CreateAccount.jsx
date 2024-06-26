import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../components";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // State for role
  const [pledgeClass, setPledgeClass] = useState(""); // State for pledge class
  const [newPledgeClassName, setNewPledgeClassName] = useState(""); // State for new pledge class name
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Define role options
  const roleOptions = [
    "Pledge",
    "Active",
    "Graduate Student",
    "Advisor",
    "Associate",
    "Alumni",
    "Honorary",
  ];

  // Define pledge class options
  const pledgeClassOptions = ["One", "Two", "Three"];

  const addPledgeClass = (event) => {
    return;
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate based on role selection
    if (role !== "Advisor" && role !== "Honorary") {
      if (!pledgeClass) {
        setError("Please select a pledge class.");
        return;
      }
    }

    // Create account with email, role, and pledge class (if applicable)
    axios
      .post("/api/create_account/", { email, role, pledgeClass })
      .then((response) => {
        setSuccess("Account created successfully.");
        setError("");
        navigate("/profile"); // Navigate to a welcome page or dashboard after account creation
      })
      .catch((error) => {
        console.error("There was an error creating the account!", error);
        setError(
          error.response.data.error || "Failed to create account. Please try again."
        );
      });
  };

  return (
    <div className="w-screen h-auto flex flex-col bg-white text-black overflow-x-hidden">
      <style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <NavBar />
      <div className="flex-grow w-screen h-auto mx-auto flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden pt-8 pb-12 px-4 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-200 p-8 rounded-lg shadow-md overflow-x-hidden h-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setPledgeClass(""); // Reset pledge class when role changes
              }}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              required
            >
              <option value="">Select a role...</option>
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional rendering of pledge class dropdown */}
          {(role !== "Advisor" && role !== "Honorary" && role !== "") && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Pledge Class <span className="text-red-500">*</span>
              </label>
              <select
                value={pledgeClass}
                onChange={(e) => setPledgeClass(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              >
                <option value="">Select a pledge class...</option>
                {pledgeClassOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          
          <div className="justify-center items-center text-center flex flex-col pb-4">
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
          </div>
        

          <button
            type="submit"
            className="w-full py-2 px-4 bg-royal-blue text-white font-semibold rounded-md hover:bg-royal-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
      <div className="flex-grow w-screen mx-auto h-auto flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden pt-8 pb-12 px-4 md:px-8">
        <form
          onSubmit={addPledgeClass}
          className="w-full max-w-lg bg-gray-200 p-8 rounded-lg shadow-md overflow-x-hidden"
        >
          {/* Create New Pledge Class section */}
          <div className="mb-4">
            <hr className="my-4" />
            <label className="block text-sm font-medium text-gray-700">
              Create New Pledge Class
            </label>
            <input
              type="text"
              name="newPledgeClass"
              value={newPledgeClassName}
              onChange={(e) => setNewPledgeClassName(e.target.value)}
              placeholder="Enter new pledge class name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              // Add any additional handlers or attributes as needed
            />
          </div>
        </form>
      </div>
      <div className="flex-grow w-screen mx-auto h-auto flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden pt-8 pb-12 px-4 md:px-8">
        <form
          onSubmit={addPledgeClass}
          className="w-full max-w-lg bg-gray-200 p-8 rounded-lg shadow-md overflow-x-hidden"
        >
          {/* Create New Pledge Class section */}
          <div className="mb-4">
            <hr className="my-4" />
            <label className="block text-sm font-medium text-gray-700">
              Create New Pledge Class
            </label>
            <input
              type="text"
              name="newPledgeClass"
              value={newPledgeClassName}
              onChange={(e) => setNewPledgeClassName(e.target.value)}
              placeholder="Enter new pledge class name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              // Add any additional handlers or attributes as needed
            />
          </div>
        </form>
      </div>

    </div>
  );
}

export default CreateAccount;
