import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ label, value, onChange }) => {
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
          value={value}
          onChange={onChange}
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

const PasswordInfo = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/change_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`
        },
        body: JSON.stringify({
          old_password: passwords.oldPassword,
          new_password: passwords.newPassword
        })
      });
  
      if (response.ok) {
        alert('Password changed successfully');
      } else {
        const errorData = await response.json();
        alert(`Error changing password: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error changing password: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap mb-4">
      <div className="pl-2 w-full">
        <p className="text-blue-800 font-bold text-xl pt-1 uppercase">Change Password</p>
        <p className="text-gray-800 text-l pb-6">Minimum 8 characters and must include a number.</p>
      </div>
      <PasswordInput
        label="old"
        value={passwords.oldPassword}
        onChange={handleChange}
      />
      <PasswordInput
        label="new"
        value={passwords.newPassword}
        onChange={handleChange}
      />
      <PasswordInput
        label="confirm"
        value={passwords.confirmPassword}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-44 rounded-3xl border-blue-500"
      >
        Save
      </button>
    </form>
  );
};

export default PasswordInfo;
