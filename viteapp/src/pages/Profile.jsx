import React, { useState, useEffect } from "react";
import { NavBar } from "../components";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

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
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handlers for personal info changes
  const handlePersonalInfoChange = (e) => {
    console.log("handling personal info change")
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

  // component for password fields
  const PasswordInput = ({ label }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <><div className="w-full px-2 mb-4 relative">
        <label className="block text-sm font-medium text-gray-700 capitalize">{label} Password <span className="text-red-500">*</span></label>
        <div className="relative flex items-center mt-1">
          <input
            type={showPassword ? "text" : "password"}
            name={`${label}Password`}
            // no functionality yet
            className="p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
            required />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-0 outline-none border-none no-underline text-gray-700 hover:text-gray-900 focus:outline-none bg-transparent"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div></>
    );
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
    console.log("entering handle submit")
    console.log("new code")
    e.preventDefault();
    console.log("after prevent default")
    console.log("after phone number")

    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }
    if (profile.profilePicture) {
      formData.append("profilePicture", profile.profilePicture);
    }
    console.log("before fetch")

    fetch("/api/create_profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Add profile information
        firstName,
        preferredName,
        middleName,
        lastName,
        schoolEmail,
        personalEmail,
        discordUsername,
        phoneNumber,
        birthday,
        pronouns,
        dietaryRestrictions,
        additionalInfo,
        profilePicture,
        pledgeClass,
        password,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.detail || 'Error creating profile');
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Profile Created");
      alert("Profile created!");
    })
    .catch((error) => {
      console.error("Profile creation error: ", error);
      alert(error.message);
    });
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return (
          <div className="flex flex-wrap mb-4">
            <div className="">
              <p className="text-blue-800 font-bold text-xl pl-2 pt-1 pb-6 uppercase">Personal Information</p>
            </div>
            <div className="w-full mb-4 px-2 justify-center sm:justify-normal">

              {/* SELECTING PROFILE PICTURE DOES NOT ALWAYS SELECT IT AND WORK */}
              <div className="flex flex-col items-start space-y-4">
                {profilePicturePreview ? (
                  <div className="flex items-center space-x-6">
                    <img
                      src={profilePicturePreview}
                      alt="Profile Preview"
                      className="rounded-full shadow-md  border-2 border-gray-300 ring-2 ring-gray-300 ring-offset-4 w-28 h-28"
                    />
                    <div className="flex flex-col content-center space-y-2 max-xs:max-w-[50%]">
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-40 max-w-full rounded-3xl"
                        onClick={() => document.getElementById('profilePictureInput').click()}
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        className="bg-red-100 hover:bg-red-50 hover:border-red-500 text-red-500 font-semibold py-2 px-4 w-40 max-w-full rounded-3xl border-red-500"
                        onClick={handleClearProfilePicture}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-8 max-w-full">
                    <div
                      className="transition-all bg-gray-200 hover:bg-gray-300 rounded-full border-2 border-gray-300 ring-2 ring-gray-300 ring-offset-4 w-28 h-28 flex items-center justify-center cursor-pointer"
                      onClick={() => document.getElementById('profilePictureInput').click()}
                    >
                      {/* Placeholder content */}
                      <span className="text-gray-500 text-4xl"><FaImage /></span>
                    </div>
                    <div className="align-center max-xs:max-w-[50%]">
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-40 max-w-full rounded-3xl"
                        onClick={() => document.getElementById('profilePictureInput').click()}
                      >
                        Upload Photo
                      </button>
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
              <label className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
                required
              />
            </div>

            <div className="w-full px-2 mb-4">
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
              <label className="block text-sm font-medium text-gray-700">Anything Else You Want People to Know</label>
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
            <p className="text-blue-800 font-bold text-xl pl-2 pt-1 pb-6 uppercase">Contact Information</p>
            <div className="flex flex-wrap">
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
          <div className="flex flex-wrap mb-4">
            <div className="justify-center sm:justify-normal pl-2">
              <p className="text-blue-800 font-bold text-xl pt-1 uppercase">Change Password</p>
              <p className="text-gray-800 text-l pb-6">Minimum 8 characters and must include a number.</p>
            </div>
            <PasswordInput label="old" />
            <PasswordInput label="new" />
            <PasswordInput label="confirm" />
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="mx-auto w-full">
        <div className="relative p-9 max-w-screen-xl mx-auto">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div className="mb-0">
              <h1 className="text-4xl mb-1 font-bold text-blue-800">Profile Details</h1>
              <p className="text-black mt-1">Provide details about yourself for other APO members.</p>
            </div>
          </header>

          <div className="justify-center flex mb-6">
            <hr className="border-t-1 border-gray-300 w-full mt-4 mb-2 max-sm:hidden" />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/4 max-sm:border-solid max-sm:rounded-md max-sm:border-2 max-sm:p-3 max-sm:mb-8">
              <ul className="sticky top-6">
                <li
                  className={`transition-all cursor-pointer py-2 px-4 flex items-center text-gray-700 rounded-md hover:border-l-4 ${activeTab === "personalInfo" ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500" : "bg-transparent hover:border-gray-300"
                    }`}
                  onClick={() => setActiveTab("personalInfo")}
                >
                  <FaUser className="mr-3" />
                  Personal Information
                </li>
                <li
                  className={`transition-all cursor-pointer py-2 px-4 flex items-center text-gray-700 rounded-md hover:border-l-4 ${activeTab === "contactInfo" ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500" : "bg-transparent hover:border-gray-300"
                    }`}
                  onClick={() => setActiveTab("contactInfo")}
                >
                  <FaEnvelope className="mr-3" />
                  Contact Information
                </li>
                <li
                  className={`transition-all cursor-pointer py-2 px-4 flex items-center text-gray-700 rounded-md hover:border-l-4 ${activeTab === "accountInfo" ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500" : "bg-transparent hover:border-gray-300"
                    }`}
                  onClick={() => setActiveTab("accountInfo")}
                >
                  <FaLock className="mr-3" />
                  Password
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-3/4 sm:pl-8">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {renderTabContent()}
              </form>

              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mx-2 mb-2 py-2 px-4 w-44 rounded-3xl border-blue-500"
                onClick={handleSubmit}
              >
                Save
              </button>

            </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;