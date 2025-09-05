// src/API.js

// Key for storing donors in localStorage
const STORAGE_KEY = "donors";

// ✅ Get all donors
export function getDonors() {
  const donors = localStorage.getItem(STORAGE_KEY);
  return donors ? JSON.parse(donors) : [];
}

// ✅ Add a new donor
export function addDonor(donor) {
  const donors = getDonors();
  donors.push(donor);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(donors));
}

// ✅ Clear all donors (for testing/reset)
export function clearDonors() {
  localStorage.removeItem(STORAGE_KEY);
}

// ✅ Filter donors by city and blood group (for Patients Dashboard)
export function searchDonors(city = "", bloodGroup = "") {
  let donors = getDonors();

  if (city) {
    donors = donors.filter(d =>
      d.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  if (bloodGroup) {
    donors = donors.filter(d => d.bloodGroup === bloodGroup);
  }

  return donors;
}