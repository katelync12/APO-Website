import React from "react";
import { useParams } from "react-router-dom";
import { MOCK_EVENTS } from "./event";

function EventDetailsPage() {
  const { id } = useParams();
  const event = MOCK_EVENTS.find((event) => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="h-screen w-100 flex justify-center items-center bg-white-200 text-black">
        <div className="w-screen">
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Start: {new Date(event.start).toLocaleString()}</p>
            <p>End: {new Date(event.end).toLocaleString()}</p>
        </div>
    </div>
  );
}

export default EventDetailsPage;
