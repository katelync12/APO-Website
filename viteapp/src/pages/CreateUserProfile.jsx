import React, { useState } from 'react';
import { FaImage } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function CreateUserProfile() {
  const [profileData, setProfileData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    discordUsername: '',
    phoneNumber: '',
    birthday: '',
    pronouns: '',
    dietaryRestrictions: '',
    additionalInfo: '',
    profilePicture: null,
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const navigate = useNavigate(); 
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];

    setProfileData((prevInfo) => ({
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
    setProfileData((prevInfo) => ({
      ...prevInfo,
      profilePicture: null,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem('token');
    Object.keys(profileData).forEach((key) => {
      if (profileData[key]) {
        formData.append(key, profileData[key]);
      }
    });

    try {
      const response = await fetch('/api/create_user_profile/', {
        method: 'POST',
        headers: {
              'Authorization': `token ${token}`
          },
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error creating user profile');
      }

      alert('Profile created successfully!');
      navigate('/calendar'); // Redirect to the calendar page after success
    } catch (error) {
      console.error('Error:', error);
      alert("Failed to create profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <p>First, fill out your user profile</p>
    <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Middle Name:
          <input
            type="text"
            name="middleName"
            value={profileData.middleName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Discord Username:
          <input
            type="text"
            name="discordUsername"
            value={profileData.discordUsername}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={profileData.birthday}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Pronouns:
          <input
            type="text"
            name="pronouns"
            value={profileData.pronouns}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Dietary Restrictions:
          <input
            type="text"
            name="dietaryRestrictions"
            value={profileData.dietaryRestrictions}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Additional Info:
          <textarea
            name="additionalInfo"
            value={profileData.additionalInfo}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
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
      </div>

      <button type="submit">Create Profile</button>
    </form>
  );
}

export default CreateUserProfile;
