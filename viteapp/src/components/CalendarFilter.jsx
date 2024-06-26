import { useMediaQuery } from "react-responsive";

const CalendarFilter = ({
  uniqueCategories,
  selectedCategories,
  handleCheckboxChange,
  categoryColors,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div className="calendar-filter">
      <div className="filters-container flex overflow-x-auto py-2">
        {uniqueCategories.map((category, index) => (
          <label
            key={category}
            className="checkbox-label"
            style={{
              backgroundColor: categoryColors[category],
              marginLeft: index === 0 ? "0" : "1px",
            }}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="checkbox-input"
            />
            <span className="checkbox-text">{category}</span>
          </label>
        ))}
      </div>

      {/* Scroll Slider Styles */}
      <style>{`
        .calendar-filter {
          width: 100%; /* Ensure the component spans the full width */
          overflow-x: auto; /* Enable horizontal scrolling */
          white-space: nowrap; /* Prevent wrapping of buttons */
        }

        .filters-container {
          display: flex;
          padding: ${isMobile ? "0.2rem" : "0.5rem"} 0;
          margin-bottom: 10px;
          align-items: center;
          justify-content: flex-start; /* Align items from left to right */
        }

        .checkbox-label {
          display: inline-flex;
          align-items: center;
          padding: ${isMobile ? "5px" : "8px"};
          border-radius: 5px;
          cursor: pointer;
          color: white;
          font-size: ${isMobile ? "0.8em" : "1em"};
        }

        .checkbox-text {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default CalendarFilter;
