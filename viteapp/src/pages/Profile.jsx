import React, { useState } from "react";
import { NavBar, PersonalInfo, ContactInfo, PasswordInfo} from "../components";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";


function Profile() {
  const [activeTab, setActiveTab] = useState("personalInfo");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return <PersonalInfo />;
      case "contactInfo":
        return <ContactInfo />;
      case "accountInfo":
        return <PasswordInfo />;
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
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
