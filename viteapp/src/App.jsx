import { useState, useEffect } from "react";
import reactLogo from "/assets/react.svg";
import viteLogo from "/assets/vite.svg";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  // Function to fetch all students from Django backend
  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students/");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to insert a dummy student
  const insertDummyStudent = async () => {
    try {
      const response = await fetch("/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "Dummy Student" }),
      });
      if (!response.ok) {
        throw new Error("Failed to insert dummy student");
      }
      // Fetch students again to update the list
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to remove all students
  const removeAllStudents = async () => {
    try {
      const response = await fetch("/api/students/", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove all students");
      }
      // Fetch students again to update the list
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch students when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center items-center space-x-8 mb-4">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={viteLogo}
            className="logo h-40 p-6 transition-filter duration-300 mb-2"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            className="logo react h-40 p-6 transition-filter duration-300 mb-2"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline mb-8">Vite + React</h1>
      <div className="card p-8 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <button className="btn" onClick={insertDummyStudent}>
            Insert Dummy Student
          </button>
          <button className="btn" onClick={removeAllStudents}>
            Remove All Students
          </button>
        </div>
        <ul className="mt-4 list-disc list-inside">
          {students.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>
      <p className="text-secondary mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
