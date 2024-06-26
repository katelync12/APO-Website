import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavBar, CalendarToolbar, CalendarFilter } from "../components";
import { useMediaQuery } from "react-responsive";
import { MOCK_EVENTS } from "../constants/event";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [view, setView] = useState(Views.MONTH); // Default view
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isLaptop = useMediaQuery({ minWidth: 641 }); // Added media query for laptop

  const uniqueCategories = [
    ...new Set(MOCK_EVENTS.map((event) => event.category)),
  ];

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const categoryColors = {
    Meeting: "#FF5733",
    Conference: "#33FF57",
    Personal: "#3357FF",
    Training: "#FF33A8",
    Celebration: "#A833FF",
    Workshop: "#FFD700",
    Workout: "#FF5733",
    Dinner: "#33FF57",
    Lunch: "#3357FF",
    Breakfast: "#FF33A8",
  };

  const filteredEvents = MOCK_EVENTS.filter(
    (event) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(event.category)
  ).map((event) => ({
    title: !event.allDay
      ? `${moment(event.start).format("HH:mm")} - ${event.title}`
      : event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    color: categoryColors[event.category],
    id: event.id,
  }));

  const handleSelectEvent = (event) => {
    window.location.href = `/event/${event.id}`;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-white-200">
      <NavBar />

      <div className="w-full px-10 py-5">
        {/* Calendar Filters */}
        <div className="flex justify-center w-full">
          <CalendarFilter
            uniqueCategories={uniqueCategories}
            selectedCategories={selectedCategories}
            handleCheckboxChange={handleCheckboxChange}
            categoryColors={categoryColors}
          />
        </div>

        <div className="App">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            events={filteredEvents}
            endAccessor="end"
            className="h-[75vh] w-full"
            eventPropGetter={(event) => {
              return {
                style: {
                  backgroundColor: event.color,
                },
              };
            }}
            onSelectEvent={handleSelectEvent}
            view={view}
            onView={(newView) => setView(newView)}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            showAllEvents={true}
            date={selectedDate} // Pass selectedDate to the Calendar
            onNavigate={(date) => setSelectedDate(date)} // Update selectedDate on navigate
            components={
              isMobile ? { toolbar: CalendarToolbar } : {} // Use the custom toolbar on mobile for now
            }
          />
        </div>
      </div>
      <style>{`      
        .App {
          text-align: center;
        }
        .App-logo {
          height: 40vmin;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: no-preference) {
          .App-logo {
            animation: App-logo-spin infinite 20s linear;
          }
        }
        .App-header {
          background-color: #282c34;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: black;
        }
        .App-link {
          color: #61dafb;
        }
        .rbc-button-link {
          color: black;
        }
        .rbc-label {
          color: black;
        }
        .rbc-toolbar-label {
          color: black;
        }
        .rbc-header {
          color: black;
        }
        .rbc-event {
          font-size: 0.9em;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
        }
        .rbc-event-content {
          white-space: normal !important; /* Ensure text wraps */
          font-size: 0.9em !important;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
        }
        .rbc-row-content .rbc-event {
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          font-size: 0.9em !important; /* Adjust the text size */
        }
        @keyframes App-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
          color: black;
          white-space: nowrap; /* Prevent text from wrapping */
        }
        .checkbox-input {
          margin-right: 10px;
        }
        .checkbox-text {
          color: white;
        }

        .dropdown-filter {
          width: 100%;
        }
        /* Mobile-specific styles */
        @media (max-width: 640px) {
          .rbc-toolbar .rbc-btn-group {
            display: none; /* Hide the original view buttons on mobile */
          }
          .rbc-event-content {
            white-space: nowrap !important; /* Prevent text wrap on mobile */
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-width: 100px; /* Adjust width as needed */
          }
        }

        /* Laptop-specific styles */
        @media (min-width: 641px) {
          .mobile-view-dropdown {
            display: none; /* Hide the dropdown on larger screens */
          }
        }
      `}</style>
    </div>
  );
}

export default CalendarPage;
