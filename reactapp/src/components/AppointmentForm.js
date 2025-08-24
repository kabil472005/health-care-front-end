import React, { useState, useEffect } from 'react';
import { fetchPatients, fetchDoctors, createAppointment } from '../utils/api';
import './AppointmentForm.css';

const AppointmentForm = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientsData, doctorsData] = await Promise.all([
          fetchPatients(),
          fetchDoctors()
        ]);
        setPatients(patientsData || []);
        setDoctors(doctorsData || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patient) newErrors.patient = 'Patient is required';
    if (!formData.doctor) newErrors.doctor = 'Doctor is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createAppointment({
        patient: formData.patient,
        doctor: formData.doctor,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        reason: formData.reason,
        status: 'REQUESTED'
      });
      setMessage('Appointment successfully booked');
      setFormData({
        patient: '',
        doctor: '',
        date: '',
        time: '',
        reason: ''
      });
    } catch (error) {
      setMessage(error.message || 'Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormComplete = formData.patient && formData.doctor && formData.date && formData.time && formData.reason;

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="patient">Patient</label>
        <select
          id="patient"
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          data-testid="patient-select"
        >
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
        {errors.patient && <span className="error">{errors.patient}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="doctor">Doctor</label>
        <select
          id="doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          data-testid="doctor-select"
        >
          <option value="">Select a doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>{doctor.name} ({doctor.specialization})</option>
          ))}
        </select>
        {errors.doctor && <span className="error">{errors.doctor}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          data-testid="date-input"
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          data-testid="time-input"
        />
        {errors.time && <span className="error">{errors.time}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="reason">Reason</label>
        <input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Enter reason for appointment"
          data-testid="reason-input"
        />
        {errors.reason && <span className="error">{errors.reason}</span>}
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormComplete || isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;