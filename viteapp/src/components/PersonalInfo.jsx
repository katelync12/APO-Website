import React, { useState, useEffect } from 'react';
import { FaImage } from "react-icons/fa";

function PersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    pronouns: "",
    dietaryRestrictions: "",
    additionalInfo: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(true); // Loading state


  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch('/api/profile_info/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
          },
          credentials: 'include'
        });
        const data = await response.json();
        setPersonalInfo({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          birthday: data.birthday,
          pronouns: data.pronouns,
          dietaryRestrictions: data.dietaryRestrictions,
          additionalInfo: data.additionalInfo,
          profilePicture: data.profilePicture,
        });

        if (data.profilePicture) {
          setProfilePicturePreview(data.profilePicture);
        }
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
      finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPersonalInfo();
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

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

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    Object.keys(personalInfo).forEach(key => {
      formData.append(key, personalInfo[key]);
    });

    try {
      const response = await fetch('/api/profile_info/', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`
        },
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        alert("Profile updated successfully");
      } else {
        console.error('Failed to update profile');
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error('Error saving personal info:', error);
      alert("Failed to update profile");
    }
  };
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }
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

      {/* Other input fields */}
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
        <label className="block text-sm font-medium text-gray-700">Middle Name</label>
        <input
          type="text"
          name="middleName"
          value={personalInfo.middleName}
          onChange={handlePersonalInfoChange}
          className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
        />
      </div>

      <div className="w-full md:w-1/2 px-2 mb-4">
        <label className="block text-sm font-medium text-gray-700">Birthday<span className="text-red-500">*</span></label>
        <input
          type="date"
          name="birthday"
          value={personalInfo.birthday}
          onChange={handlePersonalInfoChange}
          className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white appearance-none"
          required
        />
      </div>

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
          name="additionalInfo"
          value={personalInfo.additionalInfo}
          onChange={handlePersonalInfoChange}
          className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
        />
      </div>

      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-44 rounded-3xl border-blue-500"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

export default PersonalInfo;
