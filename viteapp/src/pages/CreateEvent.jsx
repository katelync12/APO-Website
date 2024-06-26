import React, { useState } from "react";
import { NavBar } from "../components";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [signupLock, setSignupLock] = useState("");
  const [signupClose, setSignupClose] = useState("");
  const [eventCoordinator, setEventCoordinator] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [repeatDays, setRepeatDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([{ date: "", startTime: "", endTime: "" }]);
  const [allDayEvent, setAllDayEvent] = useState(false);
  const [events, setEvents] = useState([]);

  const handleRepeatChange = (day) => {
    setRepeatDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { date: "", startTime: "", endTime: "" }]);
  };

  const handleRemoveTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleTimeSlotChange = (index, field, value) => {
    const newTimeSlots = timeSlots.slice();
    newTimeSlots[index][field] = value;
    setTimeSlots(newTimeSlots);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEvents = timeSlots.map(slot => ({
      title,
      date: slot.date,
      startTime: allDayEvent ? "" : slot.startTime,
      endTime: allDayEvent ? "" : slot.endTime,
      description,
      signupLock,
      signupClose,
      eventCoordinator,
      location,
      categories,
    }));
    setEvents([...events, ...newEvents]);

    // Add form validation and logic to create/edit/delete event in the backend here

    alert("Event(s) created!");
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Description"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sign-up Lock Date</label>
            <input
              type="datetime-local"
              value={signupLock}
              onChange={(e) => setSignupLock(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Sign-up Lock Date"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sign-up Close Date</label>
            <input
              type="datetime-local"
              value={signupClose}
              onChange={(e) => setSignupClose(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Sign-up Close Date"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Event Coordinator</label>
            <input
              type="text"
              value={eventCoordinator}
              onChange={(e) => setEventCoordinator(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Event Coordinator"
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Categories</label>
            <input
              type="text"
              value={categories.join(", ")}
              onChange={(e) => setCategories(e.target.value.split(",").map(cat => cat.trim()))}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Categories (comma separated)"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">All Day Event</label>
            <input
              type="checkbox"
              checked={allDayEvent}
              onChange={(e) => setAllDayEvent(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span>Yes</span>
          </div>

          {timeSlots.map((slot, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                value={slot.date}
                onChange={(e) => handleTimeSlotChange(index, "date", e.target.value)}
                className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                placeholder="Event Date"
                required
              />

              {!allDayEvent && (
                <>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
                    <input
                      type="datetime-local"
                      value={slot.startTime}
                      onChange={(e) => handleTimeSlotChange(index, "startTime", e.target.value)}
                      className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                      placeholder="Start Time"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
                    <input
                      type="datetime-local"
                      value={slot.endTime}
                      onChange={(e) => handleTimeSlotChange(index, "endTime", e.target.value)}
                      className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                      placeholder="End Time"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="button"
                onClick={() => handleRemoveTimeSlot(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Time Slot
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddTimeSlot}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Another Time Slot
          </button>

          {repeat && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Repeat on:</label>
              <div className="flex flex-wrap">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                  <label key={day} className="block text-gray-700 text-sm font-bold mb-2 mr-4">
                    <input
                      type="checkbox"
                      value={day}
                      onChange={() => handleRepeatChange(day)}
                      className="mr-2 leading-tight"
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}

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
