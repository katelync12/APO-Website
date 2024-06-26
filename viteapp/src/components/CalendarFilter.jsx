import { useState } from "react";
import { Calendar } from "react-big-calendar";
import { useMediaQuery } from "react-responsive";

const CalendarFilter = ({
  uniqueCategories,
  selectedCategories,
  handleCheckboxChange,
  categoryColors,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div>
      {isMobile ? (
        <div className="mobile-filters">
          <select
            multiple
            className="dropdown-filter w-full p-2 border border-gray-300 rounded"
            value={selectedCategories}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map(
                (option) => option.value
              );
              handleCheckboxChange(selectedOptions);
            }}
          >
            {uniqueCategories.map((category) => (
              <option
                key={category}
                value={category}
                style={{ backgroundColor: categoryColors[category] }}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="desktop-filters flex overflow-x-auto space-x-2 py-2">
          {uniqueCategories.map((category) => (
            <label
              key={category}
              className="checkbox-label"
              style={{ backgroundColor: categoryColors[category] }}
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
      )}
    </div>
  );
};

export default CalendarFilter;
