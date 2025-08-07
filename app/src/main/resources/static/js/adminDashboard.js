import { openModal } from '../components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

// Attach a click listener to the "Add Doctor" button
document.getElementById('addDoctorBtn').addEventListener('click', function () {
  openModal('addDoctor');
});

// When the DOM is fully loaded, load all doctor cards
document.addEventListener('DOMContentLoaded', function () {
  loadDoctorCards();
});

// Function: loadDoctorCards
// Purpose: Fetch all doctors and display them as cards
function loadDoctorCards() {
  try {
    const doctors = getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error('Failed to load doctors:', error);
  }
}

// Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
document.getElementById('searchBar').addEventListener('input', filterDoctorsOnChange);
document.getElementById('timeFilter').addEventListener('change', filterDoctorsOnChange);
document.getElementById('specialtyFilter').addEventListener('change', filterDoctorsOnChange);

// Function: filterDoctorsOnChange
// Purpose: Filter doctors based on name, available time, and specialty
function filterDoctorsOnChange() {
  const name = document.getElementById('searchBar').value.trim() || null;
  const time = document.getElementById('timeFilter').value || null;
  const specialty = document.getElementById('specialtyFilter').value || null;

  try {
    const doctors = filterDoctors(name, time, specialty);
    if (doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      document.getElementById('content').innerHTML = '<p>No doctors found with the given filters.</p>';
    }
  } catch (error) {
    alert('Error filtering doctors: ' + error.message);
  }
}

// Function: renderDoctorCards
// Purpose: A helper function to render a list of doctors passed to it
function renderDoctorCards(doctors) {
  const content = document.getElementById('content');
  content.innerHTML = '';
  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    content.appendChild(card);
  });
}

// Function: adminAddDoctor
// Purpose: Collect form data and add a new doctor to the system
function adminAddDoctor() {
  const name = document.getElementById('doctorName').value.trim();
  const email = document.getElementById('doctorEmail').value.trim();
  const phone = document.getElementById('doctorPhone').value.trim();
  const password = document.getElementById('doctorPassword').value;
  const specialty = document.getElementById('doctorSpecialty').value;
  const availableTimes = Array.from(document.querySelectorAll('input[name="availableTimes"]:checked')).map(input => input.value);

  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Authentication required. Please log in.');
    return;
  }

  const doctor = { name, email, phone, password, specialty, availableTimes };

  try {
    saveDoctor(doctor, token);
    alert('Doctor added successfully!');
    closeModal('addDoctor');
    loadDoctorCards();
  } catch (error) {
    alert('Failed to add doctor: ' + error.message);
  }
}
