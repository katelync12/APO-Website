import React from "react";
import { useParams } from "react-router-dom";
import { MOCK_EVENTS } from "./event";
import { NavBar } from "../components";

function EventDetailsPage() {
  const { id } = useParams();
  const event = MOCK_EVENTS.find((event) => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      <NavBar />
      <div className="flex-grow w-screen flex flex-col items-center justify-center">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>Start: {new Date(event.start).toLocaleString()}</p>
        <p>End: {new Date(event.end).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default EventDetailsPage;

