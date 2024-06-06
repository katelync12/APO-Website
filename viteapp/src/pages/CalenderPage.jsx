import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MOCK_EVENTS } from "./event";
const localizer = momentLocalizer(moment);


function CalenderPage() {
  const events = MOCK_EVENTS.map((event) => {
    // new Date(Y, M, D, H, MIN)
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    };
  });
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white-200">
      <div className="w-screen max-h-xl px-7 py-5 justify-center items-center">
        <div>
          <h1 className="text-black justify-center items-center">HI</h1>
        </div>
        <div className="App">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            events={events}
            endAccessor="end"
            style={{
              height: "85vh", // Adjust the height as needed
            }}
            eventPropGetter={(event) => {
              return {
                style: {
                  backgroundColor: event.color,
                },
              };
            }}
            onSelectEvent={(event) => alert(event.title)}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
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

export default CalenderPage;
