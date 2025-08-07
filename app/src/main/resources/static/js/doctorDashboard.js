import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

// Get the table body where patient rows will be added
const tableBody = document.querySelector('#patients-table tbody');

// Initialize selectedDate with today's date in 'YYYY-MM-DD' format
let selectedDate = new Date().toISOString().split('T')[0];

// Get the saved token from localStorage (used for authenticated API calls)
const token = localStorage.getItem('token');

// Initialize patientName to null (used for filtering by name)
let patientName = null;

// Add an 'input' event listener to the search bar
const searchBar = document.getElementById('search-bar');
if (searchBar) {
  searchBar.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    patientName = value !== '' ? value : null;
    loadAppointments();
  });
}

// Add a click listener to the "Today" button
const todayBtn = document.getElementById('today-btn');
if (todayBtn) {
  todayBtn.addEventListener('click', () => {
    selectedDate = new Date().toISOString().split('T')[0];
    const datePicker = document.getElementById('date-picker');
    if (datePicker) datePicker.value = selectedDate;
    loadAppointments();
  });
}

// Add a change event listener to the date picker
const datePicker = document.getElementById('date-picker');
if (datePicker) {
  datePicker.addEventListener('change', (e) => {
    selectedDate = e.target.value;
    loadAppointments();
  });
}

// Function: loadAppointments
function loadAppointments() {
  try {
    // Step 1: Call getAllAppointments with selectedDate, patientName, and token
    const appointments = getAllAppointments(selectedDate, patientName, token);

    // Step 2: Clear the table body content before rendering new rows
    tableBody.innerHTML = '';

    // Step 3: If no appointments are returned:
    if (!appointments || appointments.length === 0) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 5;
      cell.textContent = 'No Appointments found for today.';
      row.appendChild(cell);
      tableBody.appendChild(row);
      return;
    }

    // Step 4: If appointments exist:
    appointments.forEach((appointment) => {
      const patient = {
        id: appointment.patientId,
        name: appointment.patientName,
        phone: appointment.patientPhone,
        email: appointment.patientEmail,
      };
      const row = createPatientRow(patient, appointment);
      tableBody.appendChild(row);
    });
  } catch (error) {
    // Step 5: Catch and handle any errors during fetch:
    tableBody.innerHTML = '';
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 5;
    cell.textContent = 'Error loading appointments. Try again later.';
    row.appendChild(cell);
    tableBody.appendChild(row);
  }
}

// When the page is fully loaded (DOMContentLoaded):
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderContent === 'function') renderContent();
  loadAppointments();
});
