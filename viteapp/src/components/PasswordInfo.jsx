import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInfo() {
  const PasswordInput = ({ label }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full px-2 mb-4 relative">
        <label className="block text-sm font-medium text-gray-700 capitalize">
          {label} Password <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center mt-1">
          <input
            type={showPassword ? "text" : "password"}
            name={`${label}Password`}
            className="p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
            required
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-0 outline-none border-none text-gray-700 hover:text-gray-900 focus:outline-none bg-transparent px-3"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap mb-4">
      <div className="pl-2 w-full">
        <p className="text-blue-800 font-bold text-xl pt-1 uppercase">Change Password</p>
        <p className="text-gray-800 text-l pb-6">Minimum 8 characters and must include a number.</p>
      </div>
      <PasswordInput label="old" />
      <PasswordInput label="new" />
      <PasswordInput label="confirm" />
      <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-44 rounded-3xl border-blue-500"
    >
      Save
    </button>
    </div>
  );
}

export default PasswordInfo;
