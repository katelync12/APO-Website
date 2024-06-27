import React, { useState } from "react";
import { NavBar } from "../components";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [dateTimeRange, setDateTimeRange] = useState({ start: "", end: "" });
  const [location, setLocation] = useState("");
  const [requirementCredit, setRequirementCredit] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [signUpStart, setSignUpStart] = useState("");
  const [signUpEnd, setSignUpEnd] = useState("");
  const [lockDate, setLockDate] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [showSignUpList, setShowSignUpList] = useState(false);
  const [inviteGroups, setInviteGroups] = useState([]);
  const [isGroupEvent, setIsGroupEvent] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState(null);
  const [shifts, setShifts] = useState([{ start: "", end: "" }]);

  const handleAddShift = () => {
    setShifts([...shifts, { start: "", end: "" }]);
  };

  const handleRemoveShift = (index) => {
    const newShifts = shifts.filter((_, i) => i !== index);
    setShifts(newShifts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form validation here
    // Add logic to create/edit/delete event
    console.log("Creating Event...");
    fetch("/api/create_event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, 
        dateTimeRange,
        location,
        requirementCredit,
        additionalInfo,
        signUpStart,
        signUpEnd,
        lockDate,
        coordinator,
        showSignUpList,
        inviteGroups,
        isGroupEvent,
        attachedFiles,
        shifts
       }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Event Created");
    })
    .catch((error) => {
      console.error("Creation error: ", error);
      setError("Could not create your event");
    });
    alert("Event created!");
  };

  return (
    <div className="w-screen h-auto flex flex-col justify-center items-center bg-gray-100 text-black">
      <style>{`
        body {
          overflow-x: hidden;
        }
        .input-placeholder::placeholder {
          color: rgba(55, 65, 81, 0.7); /* Slightly darker placeholder color */
        }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(29%) sepia(96%) saturate(3429%) hue-rotate(195deg) brightness(100%) contrast(100%);
        }
        .center-button {
          display: flex;
          justify-content: center;
        }
      `}</style>
      <NavBar />
      <div className="px-4 py-8 flex-grow w-screen flex flex-col items-center justify-center">
        <form
          className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md border border-gray-300"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-4 center-button">Create Event</h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Event Title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date/Time Range</label>
            <input
              type="datetime-local"
              value={dateTimeRange.start}
              onChange={(e) => setDateTimeRange({ ...dateTimeRange, start: e.target.value })}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Start Date/Time"
              required
            />
            <input
              type="datetime-local"
              value={dateTimeRange.end}
              onChange={(e) => setDateTimeRange({ ...dateTimeRange, end: e.target.value })}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 mt-2"
              placeholder="End Date/Time"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Event Location"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Requirement Credit</label>
            <input
              type="text"
              value={requirementCredit}
              onChange={(e) => setRequirementCredit(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Requirement Credit"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Additional Information</label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Additional Information"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sign-up Start Date</label>
            <input
              type="datetime-local"
              value={signUpStart}
              onChange={(e) => setSignUpStart(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Sign-up Start Date"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sign-up End Date</label>
            <input
              type="datetime-local"
              value={signUpEnd}
              onChange={(e) => setSignUpEnd(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Sign-up End Date"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Lock Date</label>
            <input
              type="datetime-local"
              value={lockDate}
              onChange={(e) => setLockDate(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Lock Date"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Coordinator</label>
            <input
              type="text"
              value={coordinator}
              onChange={(e) => setCoordinator(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Event Coordinator"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Show Sign-up List</label>
            <input
              type="checkbox"
              checked={showSignUpList}
              onChange={(e) => setShowSignUpList(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span>Yes</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Invite Groups</label>
            <input
              type="text"
              value={inviteGroups.join(", ")}
              onChange={(e) => setInviteGroups(e.target.value.split(",").map(group => group.trim()))}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Invite Groups (comma separated)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Is Group Event</label>
            <input
              type="checkbox"
              checked={isGroupEvent}
              onChange={(e) => setIsGroupEvent(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span>Yes</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Attach Files</label>
            <input
              type="file"
              onChange={(e) => setAttachedFiles(e.target.files)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Shifts</h2>
            {shifts.map((shift, index) => (
              <div key={index} className="mb-2 flex flex-col">
                <input
                  type="datetime-local"
                  value={shift.start}
                  onChange={(e) => {
                    const newShifts = [...shifts];
                    newShifts[index].start = e.target.value;
                    setShifts(newShifts);
                  }}
                  className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  placeholder="Shift Start"
                  required
                />
                <input
                  type="datetime-local"
                  value={shift.end}
                  onChange={(e) => {
                    const newShifts = [...shifts];
                    newShifts[index].end = e.target.value;
                    setShifts(newShifts);
                  }}
                  className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 mt-2"
                  placeholder="Shift End"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveShift(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                >
                  Remove Shift
                </button>
              </div>
            ))}
            <div className="center-button">
              <button
                type="button"
                onClick={handleAddShift}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Add Shift
              </button>
            </div>
          </div>

          <div className="center-button">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
