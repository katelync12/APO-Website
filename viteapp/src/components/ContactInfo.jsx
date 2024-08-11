import React, { useState, useEffect } from 'react';

function ContactInfo() {
    const [contactInfo, setContactInfo] = useState({
        discordUsername: "",
        phoneNumber: "",
      });

      const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
      };
      const [loading, setLoading] = useState(true); // Loading state

      useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchContactInfo = async () => {
          try {
            const response = await fetch('/api/contact_info/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
              },
              credentials: 'include'
            });
            const data = await response.json();
            setContactInfo({
              discordUsername: data.discordUsername,
              phoneNumber: data.phoneNumber,
            });
          } catch (error) {
            console.error('Error fetching personal info:', error);
          }
          finally {
            setLoading(false); // Set loading to false after fetching
          }
        };
        fetchContactInfo();
      }, []);

      const handleSave = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
    
        Object.keys(contactInfo).forEach(key => {
          formData.append(key, contactInfo[key]);
        });
    
        try {
          const response = await fetch('/api/contact_info/', {
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
        <div className="mb-4">
          <p className="text-blue-800 font-bold text-xl pl-2 pt-1 pb-6 uppercase">Contact Information</p>
          <div className="flex flex-wrap">

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={contactInfo.phoneNumber}
                onChange={handleContactInfoChange}
                className="mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded-md bg-white"
                required
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
                required
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
        </div>
      );
}

export default ContactInfo;
