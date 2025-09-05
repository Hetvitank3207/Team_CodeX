import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import DonorForm from './components/DonorForm';
import PatientForm from './components/PatientForm';
import DonorDashboard from './pages/DonorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import BloodRequestList from './components/BloodRequestList';
import MapView from './components/MapView';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Header title="🩸 Blood Donation Platform" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donor" element={<DonorForm />} />
        <Route path="/patient" element={<PatientForm />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/requests" element={<BloodRequestList />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
