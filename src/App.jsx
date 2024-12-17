// src/App.jsx
import React from 'react';
import EmployeeForm from './EmployeeForm';
import axios from './axios'; // Import Axios instance

function App() {
  // onSubmit function to handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/employees', values); // Make sure this URL matches your backend route
      alert('Employee added successfully!');
    } catch (error) {
      // Handle errors from the backend
      alert('Error: ' + (error.response ? error.response.data.message : 'Something went wrong.'));
    }
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
