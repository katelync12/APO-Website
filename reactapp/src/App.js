import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  // Function to fetch all students from Django backend
  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students/');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
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
      const response = await fetch('/api/students/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Dummy Student' }),
      });
      if (!response.ok) {
        throw new Error('Failed to insert dummy student');
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
      const response = await fetch('/api/students/', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove all students');
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button onClick={insertDummyStudent}>Insert Dummy Student</button>
          <button onClick={removeAllStudents}>Remove All Students</button>
        </div>
        <ul>
          {students.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
