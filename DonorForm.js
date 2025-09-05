import React, { useState } from 'react';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function DonorForm() {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    city: '',
    isAvailable: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.bloodGroup || !formData.phone || !formData.city) {
      alert('Please fill all required fields!');
      return;
    }

    console.log('Donor Registered:', formData);
    setSubmitted(true);

    setFormData({
      name: '',
      bloodGroup: '',
      phone: '',
      city: '',
      isAvailable: true,
    });
  };

  return (
    <div style={styles.container}>
      <h2>Donor Registration</h2>

      {submitted && (
        <div style={styles.successMessage}>
          ✅ Thank you for registering as a donor!
        </div>
      )}
<form onSubmit={handleSubmit} style={styles.form}>
  <label style={styles.label}>
    Full Name<span style={{ color: 'red' }}>*</span> {/* Removed colon here */}
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      style={styles.input}
      placeholder="Enter your full name"
    />
  </label>

  <label style={styles.label}>
    Blood Group<span style={{ color: 'red' }}>*</span>
    <select
      name="bloodGroup"
      value={formData.bloodGroup}
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
    Phone Number<span style={{ color: 'red' }}>*</span>
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      style={styles.input}
      placeholder="10-digit phone number"
    />
  </label>

  <label style={styles.label}>
    City<span style={{ color: 'red' }}>*</span>
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleChange}
      style={styles.input}
      placeholder="Enter your city"
    />
  </label>

  <label style={{ ...styles.label, flexDirection: 'row', alignItems: 'center' }}>
    <input
      type="checkbox"
      name="isAvailable"
      checked={formData.isAvailable}
      onChange={handleChange}
      style={{ marginRight: '8px' }}
    />
    Available to donate
  </label>

  <button type="submit" style={styles.button}>Register</button>
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
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  successMessage: {
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '5px',
  },
};

export default DonorForm;