import React, { useState } from 'react';
import { FaImage } from "react-icons/fa";

function PersonalInfo() {
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

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      profilePicture: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearProfilePicture = () => {
    setProfilePicturePreview(null);
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      profilePicture: null,
    }));
  };

  return (
    <div className="flex flex-wrap mb-4">
      <div>
        <p className="text-blue-800 font-bold text-xl pl-2 pt-1 pb-6 uppercase">Personal Information</p>
      </div>
      <div className="w-full mb-4 px-2 justify-center sm:justify-normal">
        <div className="flex flex-col items-start space-y-4">
          {profilePicturePreview ? (
            <div className="flex items-center space-x-6">
              <img
                src={profilePicturePreview}
                alt="Profile Preview"
                className="rounded-full shadow-md border-2 border-gray-300 ring-2 ring-gray-300 ring-offset-4 w-28 h-28"
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
        <label className="block text-sm font-medium text-gray-700">
          First Name <span className="text-red-500">*</span>
        </label>
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
        <label className="block text-sm font-medium text-gray-700">
          Last Name <span className="text-red-500">*</span>
        </label>
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
        <label className="block text-sm font-medium text-gray-700">
          Anything Else You Want People to Know
        </label>
        <textarea
          name="anythingElse"
          value={personalInfo.anythingElse}
          onChange={handlePersonalInfoChange}
          className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
        />
      </div>
      <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-44 rounded-3xl border-blue-500"
    >
      Save
    </button>
    </div>
  );
}

export default PersonalInfo;
