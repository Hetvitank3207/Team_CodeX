import React, { useState } from 'react';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function PatientForm() {
  const [searchData, setSearchData] = useState({
    bloodGroup: '',
    city: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!searchData.bloodGroup || !searchData.city) {
    alert('Please fill all fields to search!');
    return;
  }

  const newRequest = {
    bloodGroup: searchData.bloodGroup,
    city: searchData.city,
    date: new Date().toLocaleDateString(),
  };

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('bloodRequests')) || [];
  existing.push(newRequest);
  localStorage.setItem('bloodRequests', JSON.stringify(existing));

  setSubmitted(true);
};


  return (
    <div style={styles.container}>
      <h2>Find a Donor</h2>

      {submitted && (
        <div style={styles.successMessage}>
          🔍 Searching for donors in {searchData.city} with blood group {searchData.bloodGroup}...
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Blood Group<span style={{ color: 'red' }}>*</span>
          <select
            name="bloodGroup"
            value={searchData.bloodGroup}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select</option>
            {bloodGroups.map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          City<span style={{ color: 'red' }}>*</span>
          <input
            type="text"
            name="city"
            value={searchData.city}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your city"
          />
        </label>

        <button type="submit" style={styles.button}>Search</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f1f1f1',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '12px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  successMessage: {
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#e0f7fa',
    color: '#006064',
    borderRadius: '5px',
  },
};

export default PatientForm;
