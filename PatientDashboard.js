import { getDonors } from '../services/api'; // ✅ Correct path
import { useState } from "react";

function PatientsDashboard() {
  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Call API.js search function
    const donors = searchDonors(city, bloodGroup);
    setResults(donors);
  };

  return (
    <div style={styles.container}>
      <h2>Find a Donor</h2>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          style={styles.input}
        >
          <option value="">Any Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      <div>
        {results.length === 0 ? (
          <p>No matching donors found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>City</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {results.map((d, i) => (
                <tr key={i}>
                  <td>{d.name}</td>
                  <td>{d.bloodGroup}</td>
                  <td>{d.city}</td>
                  <td>{d.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  filters: { marginBottom: "20px", display: "flex", gap: "10px" },
  input: { padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
  button: {
    padding: "8px 12px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  table: { borderCollapse: "collapse", width: "100%" },
};

export default PatientsDashboard;