import { useState } from "react";
import { Leaderboard, NavBar } from "../components";

const eventData = {
  "Service Hours": [
    { name: "Alice Lafkdsg", total: 50 },
    { name: "Bob 3o9nmfdsk ", total: 50 },
    { name: "Charlie MoistCritical", total: 30 },
    { name: "David from Cyberpunk Edgerunners", total: 75 },
    { name: "Eve 99999", total: 50 },
    { name: "Frank 123", total: 30 },
    { name: "Peter Jackson", total: 70 },
    { name: "Hank Hill", total: 50 },
    { name: "Ronald McDonal", total: -2881929492 },
    { name: "Jenny 4953594s", total: 70 },
    { name: "Colonel Sanders", total: 90 },
    { name: "Burger King", total: 45 },
    { name: "Wendy Baconator", total: 55 },
  ],
  "Meetings Attended": [
    { name: "Alice Lafkdsg", total: 10 },
    { name: "Bob 3o9nmfdsk ", total: 8 },
    { name: "Charlie MoistCritical", total: 9 },
    { name: "David from Cyberpunk Edgerunners", total: 12 },
    { name: "Eve 99999", total: 11 },
    { name: "Frank 123", total: 10 },
    { name: "Peter Jackson", total: 7 },
    { name: "Hank Hill", total: 8 },
    { name: "Ronald McDonal", total: 6 },
    { name: "Jenny 4953594s", total: 9 },
    { name: "Colonel Sanders", total: 10 },
    { name: "Burger King", total: 5 },
    { name: "Wendy Baconator", total: 8 },
  ],
  // Add more event types here
};

const LeaderboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Service Hours");

  const data = eventData[selectedCategory];

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="w-screen h-auto flex flex-col bg-white text-black overflow-x-hidden">
      <NavBar />

      <div className="h-screen">
        <div className="flex justify-center items-center mt-6">
          <label className="text-xl font-bold mr-4">Event Type:</label>
          <select
            value={selectedCategory}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md bg-white"
          >
            {Object.keys(eventData).map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
        </div>
        <Leaderboard data={data} title={`${selectedCategory}`} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
