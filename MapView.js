import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issues in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Load donors and patient requests from localStorage
    const storedDonors = JSON.parse(localStorage.getItem('donors')) || [];
    const storedRequests = JSON.parse(localStorage.getItem('bloodRequests')) || [];

    setDonors(storedDonors);
    setRequests(storedRequests);
  }, []);

  // Example function to convert city name to coordinates
  // In real app, use geocoding API (Google Maps, OpenStreetMap Nominatim, etc.)
  const getCoordsForCity = (city) => {
    const cityCoords = {
      'New York': [40.7128, -74.006],
      'Los Angeles': [34.0522, -118.2437],
      'Chicago': [41.8781, -87.6298],
      'Houston': [29.7604, -95.3698],
      'Miami': [25.7617, -80.1918],
      // add more cities as needed
    };
    return cityCoords[city] || [20, 0]; // default coords if unknown city
  };

  return (
    <div style={{ height: '600px', width: '90%', margin: '20px auto' }}>
      <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Donor Markers */}
        {donors.map((donor, idx) => {
          const coords = getCoordsForCity(donor.city);
          return (
            <Marker key={`donor-${idx}`} position={coords}>
              <Popup>
                <strong>Donor:</strong> {donor.name} <br />
                Blood Group: {donor.bloodGroup} <br />
                City: {donor.city} <br />
                Phone: {donor.phone}
              </Popup>
            </Marker>
          );
        })}

        {/* Patient Request Markers */}
        {requests.map((req, idx) => {
          const coords = getCoordsForCity(req.city);
          return (
            <Marker key={`req-${idx}`} position={coords} >
              <Popup>
                <strong>Blood Request</strong> <br />
                Blood Group: {req.bloodGroup} <br />
                City: {req.city} <br />
                Date: {req.date}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;

