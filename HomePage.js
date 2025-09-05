import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>Welcome to the Blood Donation Platform</h2>
      <nav>
        <ul>
          <li><Link to="/donor">Register as Donor</Link></li>
          <li><Link to="/patient">Request Blood</Link></li>
          <li><Link to="/donor-dashboard">View Donors</Link></li>
          <li><Link to="/patient-dashboard">Patient Requests</Link></li>
          <li><Link to="/requests">Blood Requests</Link></li>
          <li><Link to="/map">View Map</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
