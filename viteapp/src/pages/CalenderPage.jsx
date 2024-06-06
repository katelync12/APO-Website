import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MOCK_EVENTS } from "./event";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [selectedColors, setSelectedColors] = useState([]);

  const uniqueColors = [...new Set(MOCK_EVENTS.map(event => event.color))];

  const handleCheckboxChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const filteredEvents = MOCK_EVENTS.filter(event =>
    selectedColors.length === 0 || selectedColors.includes(event.color)
  ).map(event => ({
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    color: event.color,
    id: event.id,
  }));

  const handleSelectEvent = (event) => {
    window.location.href = `/event/${event.id}`;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-white-200">
      <div className="w-full max-w-4xl px-10 py-5">
        <div>
          <h1 className="text-black text-center">HI</h1>
        </div>
        <div className="flex justify-center mb-4">
          {uniqueColors.map(color => (
            <label key={color} className="flex items-center mx-2">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => handleCheckboxChange(color)}
              />
              <span
                style={{ backgroundColor: color }}
                className="w-4 h-4 inline-block ml-2"
              ></span>
            </label>
          ))}
        </div>
        <div className="App">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            events={filteredEvents}
            endAccessor="end"
            style={{ height: "75vh" }}
            eventPropGetter={(event) => {
              return {
                style: {
                  backgroundColor: event.color,
                },
              };
            }}
            onSelectEvent={handleSelectEvent}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          />
        </div>
      </div>
      <style>{`
        .checkbox-label {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        
        .checkbox-color {
          width: 15px;
          height: 15px;
          margin-left: 5px;
          border-radius: 3px;
          display: inline-block;
        }

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
          font-size: calc(10px + 2vmin);
          color: white;
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
        .rbc-header {
          color: black;
        }
        .rbc-toolbar-label {
          color: black;
        }
        @keyframes App-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default CalendarPage;
