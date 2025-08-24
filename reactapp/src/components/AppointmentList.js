import React, { useState, useEffect } from 'react';
import {
  fetchAppointmentsByPatient,
  updateAppointmentStatus,
  fetchPatients,
  fetchDoctors
} from '../utils/api';
import './AppointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [patientsData, doctorsData] = await Promise.all([
          fetchPatients(),
          fetchDoctors()
        ]);
        setPatients(patientsData || []);
        setDoctors(doctorsData || []);
      } catch (err) {
        setError('Failed to load initial data');
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!selectedPatient) {
      setAppointments([]);
      return;
    }

    const loadAppointments = async () => {
      setIsLoading(true);
      setError('');
      try {
        const appointmentsData = await fetchAppointmentsByPatient(selectedPatient);
        setAppointments(appointmentsData || []);
      } catch (err) {
        setError('Failed to load appointments');
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppointments();
  }, [selectedPatient]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      setAppointments(prev => prev.map(app =>
        app.id === appointmentId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  return (
    <div className="appointment-list">
      <h2>Appointment List</h2>

      <div className="patient-filter">
        <label htmlFor="patient-filter">Filter by Patient:</label>
        <select
          id="patient-filter"
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          data-testid="patient-filter"
        >
          <option value="">All Patients</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">[Error - You need to specify the message]</div>}

      {isLoading ? (
        <div>Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div data-testid="no-appointments">No appointments found for the selected patient.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{doctors.find(d => d.id === appointment.doctor)?.name || 'Unknown'}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === 'REQUESTED' && (
                    <>
                      <button onClick={() => handleStatusChange(appointment.id, 'APPROVED')}>
                        Approve
                      </button>
                      <button onClick={() => handleStatusChange(appointment.id, 'REJECTED')}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;