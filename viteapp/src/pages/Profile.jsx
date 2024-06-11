import React, { useState, useEffect } from "react";
import { NavBar } from "../components";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    preferredName: "",
    middleName: "",
    lastName: "",
    schoolEmail: "",
    personalEmail: "",
    discordUsername: "",
    phoneNumber: "",
    birthday: "",
    pronouns: "",
    dietaryRestrictions: "",
    additionalInfo: "",
    profilePicture: null,
    pledgeClass: "",
    password: "", // Add the password field to your profile state
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch profile data from the backend
    axios.get("/api/profiles/1/")  // Replace with actual user ID or endpoint
      .then(response => {
        setProfile(response.data);
        if (response.data.profilePicture) {
          setProfilePicturePreview(response.data.profilePicture);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the profile data!", error);
      });
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profilePicture: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create form data to send to the backend
    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }
    if (profile.profilePicture) {
      formData.append("profilePicture", profile.profilePicture);
    }

    axios.put("/api/profiles/1/", formData)  // Replace with actual user ID or endpoint
      .then(response => {
        console.log("Profile updated successfully", response.data);
      })
      .catch(error => {
        console.error("There was an error updating the profile!", error);
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
      <div className="flex-grow w-screen mx-auto flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden pt-8 pb-12 px-4 md:px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-gray-200 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Preferred Name</label>
              <input
                type="text"
                name="preferredName"
                value={profile.preferredName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={profile.middleName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">School Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="schoolEmail"
                value={profile.schoolEmail}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Personal Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="personalEmail"
                value={profile.personalEmail}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Discord Username <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="discordUsername"
                value={profile.discordUsername}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Birthday <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="birthday"
                value={profile.birthday}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Pronouns <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="pronouns"
                value={profile.pronouns}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
              <input
                type="text"
                name="dietaryRestrictions"
                value={profile.dietaryRestrictions}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              />
            </div>

            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Anything Else You Want People to Know About You</label>
              <textarea
                name="additionalInfo"
                value={profile.additionalInfo}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white"
              />
            </div>

            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Picture <span className="text-red-500">*</span></label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="mt-1 block w-full"
              />
              {profilePicturePreview && (
                <img
                  src={profilePicturePreview}
                  alt="Profile Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
                />
              )}
            </div>

            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Pledge Class</label>
              <input
                type="text"
                value={profile.pledgeClass}
                readOnly
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
