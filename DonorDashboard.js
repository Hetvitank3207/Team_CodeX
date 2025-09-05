import { getDonors } from '../services/api'; 
import React, { useEffect, useState } from 'react';

function DonorDashboard() {
  

  useEffect(() => {
  setDonors(getDonors()); 
}, []);

  return (
    <div style={styles.container}>
      <h2>🩸 Donor Dashboard</h2>
      {donors.length === 0 ? (
        <p>No donors registered yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Phone</th>
              <th>City</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.name}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.phone}</td>
                <td>{donor.city}</td>
                <td>{donor.isAvailable ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' },
  th: { border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2' },
  td: { border: '1px solid #ddd', padding: '10px', textAlign: 'center' },
};

export default DonorDashboard;