import React, { useEffect, useState } from 'react';

function BloodRequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Get saved patient requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem('bloodRequests')) || [];
    setRequests(storedRequests);
  }, []);

  return (
    <div style={styles.container}>
      <h2>📋 Blood Request List</h2>

      {requests.length === 0 ? (
        <p>No blood requests have been made yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>City</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index}>
                <td>{req.bloodGroup}</td>
                <td>{req.city}</td>
                <td>{req.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fdfdfd',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  th: {
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f1f1f1',
  },
  td: {
    padding: '10px',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
};

export default BloodRequestList;
