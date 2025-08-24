import React from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
// import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Healthcare Appointment Management</h1>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Book an Appointment</h2>
        <AppointmentForm />
      </div>
      <div>
        <h2>View Appointments</h2>
        <AppointmentList />
      </div>
    </div>
  );
}

export default App;
