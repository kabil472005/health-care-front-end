import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Healthcare Appointment Management</h1>
      <p>
        Easily book, manage, and view your healthcare appointments all in one place.
        Our platform helps you stay organized and connected with your healthcare providers.
      </p>
      <div className="landing-actions">
        <button
          className="landing-btn"
          onClick={() => navigate('/appointment-form')}
        >
          Get Started
        </button>
        <button
          className="landing-btn secondary"
          onClick={() => navigate('/appointment-list')}
        >
          View Appointment List
        </button>
      </div>
    </div>
  );
}

export default LandingPage;