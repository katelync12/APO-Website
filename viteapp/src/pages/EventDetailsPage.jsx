import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    fetch(`/api/get_event?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvent(data);
      })
      .catch(error => {
        console.error('Error fetching event: ', error);
        setError('Could not load event');
      });
  }, [id]);

  const handleDelete = (deleteRecurring) => {
    fetch(`/api/delete_event/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        delete_recurring: deleteRecurring,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Event deleted successfully');
      // Redirect or update UI as needed
    })
    .catch(error => {
      console.error('Error deleting event: ', error);
      alert('Could not delete event');
    });
  };

  const handleDeleteButtonClick = () => {
    if (event.recurrence) {
      setShowPopover(true);
    } else {
      handleDelete(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      <NavBar />
      <div className="flex-grow w-screen flex flex-col items-center justify-center">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>Start: {new Date(event.start_time).toLocaleString()}</p>
        <p>End: {new Date(event.end_time).toLocaleString()}</p>
        <p>Location: {event.location}</p>
        {event.categories && event.categories.length > 0 && (
          <div>
            <h2>Categories:</h2>
            <ul>
              {event.categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDeleteButtonClick}
        >
          Delete Event
        </button>
        {showPopover && (
          <div className="absolute bg-white border border-gray-300 p-4 rounded shadow-lg">
            <p>Do you want to delete this event or all recurrences?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                onClick={() => handleDelete(false)}
              >
                Delete Single Event
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(true)}
              >
                Delete All Recurrences
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded ml-2"
                onClick={() => setShowPopover(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetailsPage;
