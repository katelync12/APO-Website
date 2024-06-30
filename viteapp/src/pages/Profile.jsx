import React, { useState, useEffect } from "react";
import { NavBar } from "../components";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Profile() {

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    preferredName: "",
    middleName: "",
    lastName: "",
    pronouns: "",
    dietaryRestrictions: "",
    additionalInfo: "",
    profilePicture: null,
  });

  const [contactInfo, setContactInfo] = useState({
    schoolEmail: "",
    personalEmail: "",
    discordUsername: "",
    phoneNumber: "",
    birthday: "",
  });

  const [accountInfo, setAccountInfo] = useState({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });

  // Handlers for personal info changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  // Handlers for contact info changes
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  // Handlers for account info changes
  const handleAccountInfoChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({ ...accountInfo, [name]: value });
  };

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
    password: "",
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [activeTab, setActiveTab] = useState("personalInfo");

  useEffect(() => {
    axios.get('/api/profile/')
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
    console.log("Profile picture selected...");
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setProfile({ ...profile, profilePicture: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearProfilePicture = () => {
    setProfilePicturePreview(null);
    setProfile({ ...profile, profilePicture: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(profile.phoneNumber)) {
      setPhoneError("Phone number must be exactly 10 digits and contain only numbers.");
      return;
    } else {
      setPhoneError("");
    }

    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }
    if (profile.profilePicture) {
      formData.append("profilePicture", profile.profilePicture);
    }

    axios.put("/api/update_profile/", formData)
      .then(response => {
        console.log("Profile updated successfully", response.data);
      })
      .catch(error => {
        console.error("There was an error updating the profile!", error);
      });
  };

  
const renderTabContent = () => {
  switch (activeTab) {
    case "personalInfo":
      return (
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="justify-center xs:justify-normal">
            <p className="text-blue-800 text-3xl pb-8">Personal Information</p>
          </div>
          <div className="w-full mb-4 px-2 justify-center xs:justify-normal">

            {/* SELECTING PROFILE PICTURE DOES NOT ALWAYS SELECT IT AND WORK */}
            <div className="flex flex-col items-start space-y-4">
            {profilePicturePreview ? (
              <div className="flex items-center space-x-4">
                <img
                  src={profilePicturePreview}
                  alt="Profile Preview"
                  className="rounded-full shadow-md w-20 h-20"
                />
                <div>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4  w-full max-w-xs rounded-3xl border-blue-500"
                    onClick={() => document.getElementById('profilePictureInput').click()}
                  >
                    Change Photo
                  </button>
                  <button
                    type="button"
                    className="bg-red-100 hover:bg-red-50 hover:border-red-500 text-red-500 font-semibold mt-2 py-2 px-4 w-full max-w-xs rounded-3xl border-red-500"
                    onClick={handleClearProfilePicture}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div
                  className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('profilePictureInput').click()}
                >
                  {/* Placeholder content */}
                  <span className="text-gray-500 text-2xl">+</span>
                </div>
                <div className="align-center">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4  w-full max-w-xs rounded-3xl border-blue-500"
                    onClick={() => document.getElementById('profilePictureInput').click()}
                  >
                    Upload Photo
                  </button>
                  {/* <button
                    type="button"
                    className="bg-red-100 hover:bg-red-50 hover:border-red-500 text-red-500 font-semibold mt-2 py-2 px-4 w-full max-w-xs rounded-3xl border-red-500"
                    onClick={handleClearProfilePicture}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            )}
            <label htmlFor="profilePictureInput" className="relative">
              <input
                id="profilePictureInput"
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </label>
          </div>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Preferred Name</label>
            <input
              type="text"
              name="preferredName"
              value={personalInfo.preferredName}
              onChange={handlePersonalInfoChange}
              className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
            />
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={personalInfo.birthday}
              onChange={handlePersonalInfoChange}
              className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white appearance-none"
            />
          </div>
          <style>{`
            input[type="date"]::-webkit-calendar-picker-indicator {
              filter: invert(80%) sepia(10%) saturate(900%) hue-rotate(180deg);
            }
          `}</style>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Pronouns</label>
            <input
              type="text"
              name="pronouns"
              value={personalInfo.pronouns}
              onChange={handlePersonalInfoChange}
              className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
            />
          </div>

          <div className="w-full px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={personalInfo.dietaryRestrictions}
              onChange={handlePersonalInfoChange}
              className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
            />
          </div>

          <div className="w-full px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Anything Else</label>
            <textarea
              name="anythingElse"
              value={personalInfo.anythingElse}
              onChange={handlePersonalInfoChange}
              className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
            />
          </div>
        </div>
      );

    case "contactInfo":
      return (
        <div className="mb-4">
          <div className="justify-center xs:justify-normal">
            <p className="text-blue-800 text-3xl pb-8">Contact Information</p>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">School Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="schoolEmail"
                value={contactInfo.schoolEmail}
                onChange={handleContactInfoChange}
                className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Personal Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="personalEmail"
                value={contactInfo.personalEmail}
                onChange={handleContactInfoChange}
                className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={contactInfo.phoneNumber}
                onChange={handleContactInfoChange}
                className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Discord Username</label>
              <input
                type="text"
                name="discordUsername"
                value={contactInfo.discordUsername}
                onChange={handleContactInfoChange}
                className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
              />
            </div>
          </div>
        </div>
      );

    case "accountInfo":
      return (
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="justify-center xs:justify-normal">
            <p className="text-blue-800 text-3xl pb-8">Change Password</p>
            <p className="text-gray-800 text-xl pb-8">Include a number, at least 8 characters blah</p>
          </div>
          <div className="w-full px-2 mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Old Password<span className="text-red-500">*</span></label>
            <div className="relative flex items-center mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                value={accountInfo.oldPassword}
                onChange={handleAccountInfoChange}
                className="p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-2 outline-none border-none no-underline text-gray-700 hover:text-gray-900 focus:outline-none bg-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="w-full px-2 mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">New Password <span className="text-red-500">*</span></label>
            <div className="relative flex items-center mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={accountInfo.newPassword}
                onChange={handleAccountInfoChange}
                className="p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-2 outline-none border-none no-underline text-gray-700 hover:text-gray-900 focus:outline-none bg-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="w-full px-2 mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative flex items-center mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={accountInfo.confirmPassword}
                onChange={handleAccountInfoChange}
                className="p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-2 outline-none border-none no-underline text-gray-700 hover:text-gray-900 focus:outline-none bg-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <NavBar />
      <div className="mx-auto mt-2">
        <div className="relative p-6">
          <header className="flex flex-col sm:flex-row justify-between items-center mb-2">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-4xl font-semibold text-blue-800">Profile Details</h1>
              <p className="text-black mt-1">Subtext thing that idk what to put here really</p>
            </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
                type="button"
                className="bg-white hover:bg-gray-100 hover:border-gray-600 text-blue-900 font-semibold py-2 px-4 w-44 rounded-3xl border-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 w-44 rounded-3xl border-blue-500"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </header>

          <div className="justify-center flex">
            <hr className="border-t-2 border-black w-full mx-4 my-4" />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full xs:w-1/4">
              <ul className="sticky top-6">
                <li
                  className={`cursor-pointer py-2 px-4 flex items-center text-gray-700 rounded-md ${
                    activeTab === "personalInfo" ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTab("personalInfo")}
                >
                  <FaUser className="mr-2" />
                  Personal Information
                </li>
                <li
                  className={`cursor-pointer py-2 px-4 flex items-center text-gray-700 rounded-md ${
                    activeTab === "contactInfo" ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTab("contactInfo")}
                >
                  <FaEnvelope className="mr-2" />
                  Contact Information
                </li>
                <li
                  className={`cursor-pointer py-2 px-4 flex items-center text-gray-700 rounded-md ${
                    activeTab === "accountInfo" ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTab("accountInfo")}
                >
                  <FaLock className="mr-2" />
                  Password
                </li>
              </ul>
            </div>
            <div className="w-full xs:w-3/4 xs:pl-8">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {renderTabContent()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;