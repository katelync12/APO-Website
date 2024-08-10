import React, { useState } from 'react';

function ContactInfo() {
    const [contactInfo, setContactInfo] = useState({
        schoolEmail: "",
        personalEmail: "",
        discordUsername: "",
        phoneNumber: "",
        birthday: "",
      });

      const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
      };
    


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
            <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-44 rounded-3xl border-blue-500"
    >
      Save
    </button>
          </div>
        </div>
      );
}

export default ContactInfo;
