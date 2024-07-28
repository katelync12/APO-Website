import React, { useState, useEffect} from "react";
import { NavBar } from "../components";
import CategoryDropdown from "../components/CategoryDropdown";
import { CreateCategory } from "../components";
import { Modal, Button } from 'react-bootstrap';
import { adjustDaysForUTC } from "../utils";
function CreateEvent() {
  const [title, setTitle] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [signup_close, setSignUpClose] = useState("");
  const [signup_lock, setSignUpLock] = useState("");
  const [showSignUpList, setShowSignUpList] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [shifts, setShifts] = useState([{ name: "", capacity: "", start_time: "", end_time: "" }]);
  const [showModal, setShowModal] = useState(false);
  const [driving, setDriving] = useState(false);  // New state for driving checkbox
  const [isRecurring, setIsRecurring] = useState(false);  // New state for recurrence checkbox
  const [recurrenceEnd, setRecurrenceEnd] = useState("");  // New state for recurrence end date
  const [selectedDays, setSelectedDays] = useState([]);
  const [weekInterval, setWeekInterval] = useState(1);
  const [containsMultipleShifts, setContainsMultipleShifts] = useState(false);
  const daysOfWeek = [
    { label: 'Sunday', value: 0 },
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
];

const handleDayChange = (value) => {
    const newSelectedDays = selectedDays.includes(value)
        ? selectedDays.filter(day => day !== value)
        : [...selectedDays, value];

    setSelectedDays(newSelectedDays);
};

const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.target.value, 10);
    if (newInterval > 0) {
        setWeekInterval(newInterval);
    }
};

  useEffect(() => {
    if (!containsMultipleShifts) {
      // When single shift mode is enabled, set a default shift
      setShifts([{
        name: title,
        capacity: -1,
        start_time: start_time,
        end_time: end_time
      }]);
    }
  }, [containsMultipleShifts, title, start_time, end_time]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleAddShift = () => {
    setShifts([...shifts, { name: "", capacity: "", start_time: "", end_time: "" }]);
  };

  const handleRemoveShift = (index) => {
    const newShifts = shifts.filter((_, i) => i !== index);
    setShifts(newShifts);
  };

  const convertToUTC = (localDateTime) => {
    const date = new Date(localDateTime);
    return date.toISOString();
  };
  useEffect(() => {
    if (start_time) {
      const startDate = new Date(start_time);
      const dayOfWeek = startDate.getDay();
      setSelectedDays([dayOfWeek]);
    }
  }, [start_time]);
``
  const handleSubmit = (event) => {
    event.preventDefault();
    // Convert the datetime fields to UTC
    const utcStartTime = convertToUTC(start_time);
    const utcEndTime = convertToUTC(end_time);
    const utcSignupClose = convertToUTC(signup_close);
    const utcSignupLock = convertToUTC(signup_lock);
    const utcShifts = shifts.map(shift => ({
      ...shift,
      start_time: convertToUTC(shift.start_time),
      end_time: convertToUTC(shift.end_time),
    }));
    const adjustedDays = adjustDaysForUTC(start_time, selectedDays);
    // Add form validation here
    // Add logic to create/edit/delete event
    console.log("Creating Event...");
    fetch("/api/create_event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        start_time: utcStartTime,
        end_time: utcEndTime,
        location,
        description,
        signup_close: utcSignupClose,
        signup_lock: utcSignupLock,
        showSignUpList,
        shifts: utcShifts,
        categories: selectedCategories,
        driving,  // Include driving in the request body
        recurrence_end: isRecurring ? convertToUTC(recurrenceEnd) : null,  // Include recurrence end date if applicable
        week_interval: isRecurring ? weekInterval : null,  // Include recurrence interval if applicable
        days_of_week: isRecurring ? adjustedDays : null,  // Include selected days if applicable
      }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.detail || 'Error creating event');
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Event Created");
      alert("Event created!");
    })
    .catch((error) => {
      console.error("Creation error: ", error);
      alert(error.message);
    });
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
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Start Date/Time"
              required
            />
            <input
              type="datetime-local"
              value={end_time}
              onChange={(e) => setEndTime(e.target.value)}
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Sign-up Close Date</label>
            <input
              type="datetime-local"
              value={signup_close}
              onChange={(e) => setSignUpClose(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Sign-up End Date"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Lock Attendees Date</label>
            <input
              type="datetime-local"
              value={signup_lock}
              onChange={(e) => setSignUpLock(e.target.value)}
              className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              placeholder="Lock Date"
              required
            />
          </div>

          

          <CategoryDropdown
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

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
            <label className="block text-gray-700 text-sm font-bold mb-2">Contains Multiple Shifts</label>
            <input
              type="checkbox"
              checked={containsMultipleShifts}
              onChange={(e) => setContainsMultipleShifts(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span>Yes</span>
          </div>

          {containsMultipleShifts && (
  <div className="mb-4">
    <h2 className="text-lg font-bold mb-2">Shifts</h2>
    {shifts.map((shift, index) => (
      <div key={index} className="mb-2 flex flex-col">
        <input
          type="text"
          value={shift.name}
          onChange={(e) => {
            const newShifts = [...shifts];
            newShifts[index].name = e.target.value;
            setShifts(newShifts);
          }}
          className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          placeholder="Shift Name"
          required
        />
        <input
          type="number"
          value={shift.capacity}
          onChange={(e) => {
            const newShifts = [...shifts];
            newShifts[index].capacity = e.target.value;
            setShifts(newShifts);
          }}
          className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 mt-2"
          placeholder="Shift Capacity"
          required
        />
        <input
          type="datetime-local"
          value={shift.start_time}
          onChange={(e) => {
            const newShifts = [...shifts];
            newShifts[index].start_time = e.target.value;
            setShifts(newShifts);
          }}
          className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          placeholder="Shift Start"
          required
        />
        <input
          type="datetime-local"
          value={shift.end_time}
          onChange={(e) => {
            const newShifts = [...shifts];
            newShifts[index].end_time = e.target.value;
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
)}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Driving</label>
            <input
              type="checkbox"
              checked={driving}
              onChange={(e) => setDriving(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span>Yes</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Recurring Event</label>
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span>Yes</span>
          </div>

          {isRecurring && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Recurrence End Date</label>
                <input
                  type="datetime-local"
                  value={recurrenceEnd}
                  onChange={(e) => setRecurrenceEnd(e.target.value)}
                  className="input-placeholder shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  placeholder="Recurrence End Date"
                  required
                />
              </div>

              <div>
            <div>
                <label>Repeat on:</label>
                {daysOfWeek.map(day => (
                    <div key={day.value}>
                        <input
                            type="checkbox"
                            id={`day-${day.value}`}
                            value={day.value}
                            checked={selectedDays.includes(day.value)}
                            onChange={() => handleDayChange(day.value)}
                        />
                        <label htmlFor={`day-${day.value}`}>{day.label}</label>
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="week-interval">Repeat every:</label>
                <input
                    type="number"
                    id="week-interval"
                    value={weekInterval}
                    min="1"
                    onChange={handleIntervalChange}
                />
                <span>week(s)</span>
            </div>
        </div>
            </>
          )}

          <div className="center-button">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Event
            </button>
          </div>
        </form>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCategory />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateEvent;