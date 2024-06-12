import React, { useState } from "react";
import { NavBar } from "../components";

// Mock data for demonstration purposes
const requirements = {
  pledge: {
    service: {
      description: "Service Requirements",
      totalProjects: 6,
      progress: 3, // example progress
      subRequirements: [
        { description: "National service project", total: 1, completed: 1 },
        { description: "Campus service project", total: 1, completed: 0.5 },
        { description: "Scouting service project", total: 1, completed: 1 },
        { description: "Community service project", total: 1, completed: 0.2 },
        { description: "Blood drive project", total: 1, completed: 0 },
        { description: "Service hours", total: 10, completed: 10 }
      ]
    },
    finance: {
      description: "Finance Requirements",
      totalProjects: 2,
      progress: 1,
      subRequirements: [
        { description: "Chapter fundraiser project", total: 1, completed: 10.5 },
        { description: "Charity fundraiser project", total: 10, completed: 1 }
      ]
    },
    // Add other categories similarly
  },
  active: {
    // Define active requirements similarly
  },
  gradStudent: {
    // Define grad student requirements similarly
  }
};

const userType = "pledge"; // Example user type, replace with actual logic to get the user type

function Requirements() {
  const [userProgress, setUserProgress] = useState(requirements[userType]);

  const renderProgressBar = (total, progress) => {
    const percentage = Math.min(Math.round((progress / total) * 100), 100); // Limit to maximum of 100% and round to whole number
    const percentLabel = `${percentage}%`;
    const textColor = percentage === 100 ? 'text-yellow-400' : 'text-black'; // Conditionally apply gold color if percentage is 100

    return (
      <div className="w-full bg-gray-200 rounded-md h-10 mb-4 relative">
        <div
          className="bg-blue-600 h-full rounded-md absolute top-0 left-0"
          style={{ width: `${percentage}%` }}
        ></div>
        <div className={`absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center ${textColor}`}>
          {percentLabel}
        </div>
      </div>
    );
  };

  const renderRequirements = () => {
    return Object.keys(userProgress).map((key) => {
      const req = userProgress[key];
      return (
        <div key={key} className="mb-8 p-4 w-full max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
            <style>{`
            body {
                overflow-x: hidden;
            }
            `}</style>
          <h2 className="font-bold text-lg mb-4">{req.description}</h2>
          <div className="flex justify-between mb-2">
            <span>Completed: {req.progress} Projects</span>
            <span>Total: {req.totalProjects} Projects</span>
          </div>
          {renderProgressBar(req.totalProjects, req.progress)}
          {/* <ul className="list-disc pl-5 mt-4"> */}
          <ul className="pl-5 mt-4">
            {req.subRequirements.map((subReq, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{subReq.description}</span>
                  <span>({subReq.completed}/{subReq.total} hours)</span>
                </div>
                {renderProgressBar(subReq.total, subReq.completed)}
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="w-screen flex flex-col bg-white text-black overflow-x-hidden">
      <style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <NavBar />
      <div className="flex-grow w-full flex flex-col items-center justify-center p-4 overflow-x-hidden">
        <h1 className="text-2xl font-bold mb-8">Requirements</h1>
        {renderRequirements()}
      </div>
    </div>
  );
}

export default Requirements;
