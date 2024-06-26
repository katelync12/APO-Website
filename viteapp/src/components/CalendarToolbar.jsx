/* eslint-disable no-case-declarations */
import { useMediaQuery } from "react-responsive";
import { Views } from "react-big-calendar";
import moment from "moment";

const CalendarToolbar = ({ date, view, onNavigate, onView }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleViewChange = (e) => {
    onView(e.target.value);
  };

  const goToBack = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  const goToToday = () => {
    onNavigate("TODAY");
  };

  // Function to get the label based on view and date
  const getToolbarLabel = () => {
    switch (view) {
      case Views.MONTH:
        return moment(date).format("MMMM YYYY"); // Display current month and year for Month view
      case Views.WEEK:
        // Determine start and end dates of the week
        const startOfWeek = moment(date).startOf("week");
        const endOfWeek = moment(date).endOf("week");

        // Format start and end dates
        const startMonth = startOfWeek.format("MMMM");
        const endMonth = endOfWeek.format("MMMM");
        const startDay = startOfWeek.format("DD");
        const endDay = endOfWeek.format("DD");

        // Check if the week spans across different months
        if (startMonth !== endMonth) {
          return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
        } else {
          return `${startMonth} ${startDay} - ${endDay}`;
        }
      // return `${startOfWeek} - ${endOfWeek}`;
      case Views.DAY:
        return moment(date).format("dddd MMMM DD"); // Display full date for Day view
      case Views.AGENDA:
        const startAgenda = moment(date).format("MM/DD/YYYY");
        const endAgenda = moment(date)
          .add(1, "month")
          .subtract(1, "day")
          .format("MM/DD/YYYY");

        return `${startAgenda} – ${endAgenda}`;
      default:
        return moment(date).format("MMMM YYYY"); // return current month by default
    }
  };

  return (
    <div className="rbc-toolbar w-full flex items-center justify-between">
      {isMobile ? (
        <div className="mobile-controls w-full flex items-center space-x-4">
          {/* Navigator: Back Today Next */}
          <div className="flex items-center justify-center">
            <button
              onClick={goToBack}
              className="bg-gray-300 rounded h-7 w-6 px-2 flex items-center"
            >
              <span className="relative top-[-3px] right-[5px]">{`<`}</span>
            </button>
            <button
              onClick={goToToday}
              className="bg-gray-300 rounded h-7 px-2 flex items-center"
            >
              <span className="relative top-[-3px]">Today</span>
            </button>
            <button
              onClick={goToNext}
              className="bg-gray-300 rounded h-7 w-6 px-2 flex items-center"
            >
              <span className="relative top-[-3px] right-[5px]">{`>`}</span>
            </button>
          </div>

          {/* Toolbar Label */}
          <span className="rbc-toolbar-label text-center flex-1 min-w-[4.5em] max-w-[18.5em]">
            {getToolbarLabel()}
          </span>

          {/* View Selector */}
          <div className="relative">
            <select
              value={view}
              onChange={handleViewChange}
              className="px-2 py-1 bg-white-200 text-gray-800 text-medium rounded border border-gray-300"
            >
              <option value={Views.MONTH}>Month</option>
              <option value={Views.WEEK}>Week</option>
              <option value={Views.DAY}>Day</option>
              <option value={Views.AGENDA}>Agenda</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              ></svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="desktop-controls">
          {/* Default desktop controls can be added here if needed */}
        </div>
      )}
    </div>
  );
};

export default CalendarToolbar;
