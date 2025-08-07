// === Imports ===
import { showBookingOverlay } from "./loggedPatient.js";
import { deleteDoctor } from "./services/doctorServices.js";
import { fetchPatientDetails } from "./services/patientServices.js";

// === Hlavní funkce ===
export function createDoctorCard(doctor) {
  // Hlavní obal karty
  const doctorCard = document.createElement("div");
  doctorCard.classList.add("doctor-card");

  // Role a token
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // === Informace o lékaři ===
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = `Dr. ${doctor.name}`;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialization: ${doctor.specialization}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  // Volitelné: dostupné časy
  const times = document.createElement("ul");
  times.classList.add("availability-list");
  if (doctor.availableTimes && doctor.availableTimes.length) {
    doctor.availableTimes.forEach(slot => {
      const li = document.createElement("li");
      li.textContent = `${slot.date} (${slot.from} - ${slot.to})`;
      times.appendChild(li);
    });
  }

  // Přidání do info sekce
  infoDiv.append(name, specialization, email, times);

  // === Akční tlačítka ===
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("doctor-actions");

  // --- ADMIN ---
  if (role === "admin") {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("adminBtn", "delete-btn");

    deleteBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(`Are you sure you want to delete Dr. ${doctor.name}?`);
      if (!confirmDelete) return;

      const adminToken = token; // assumed valid if role is admin
      try {
        const success = await deleteDoctor(doctor.id, adminToken);
        if (success) {
          doctorCard.remove();
          alert("Doctor deleted successfully.");
        } else {
          alert("Failed to delete doctor.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting doctor.");
      }
    });

    actionsDiv.appendChild(deleteBtn);
  }

  // --- ANONYMNÍ PACIENT ---
  else if (role === "patient" || !token) {
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.classList.add("book-btn");

    bookBtn.addEventListener("click", () => {
      alert("Please log in to book an appointment.");
      window.location.href = "/"; // or open login modal
    });

    actionsDiv.appendChild(bookBtn);
  }

  // --- PŘIHLÁŠENÝ PACIENT ---
  else if (role === "loggedPatient") {
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.classList.add("book-btn");

    bookBtn.addEventListener("click", async () => {
      if (!token) {
        alert("Token expired. Please log in again.");
        localStorage.removeItem("userRole");
        window.location.href = "/";
        return;
      }

      try {
        const patient = await fetchPatientDetails(token);
        showBookingOverlay({ doctor, patient });
      } catch (err) {
        console.error("Error booking:", err);
        alert("Unable to load patient information.");
      }
    });

    actionsDiv.appendChild(bookBtn);
  }

  // === Složení celé karty ===
  doctorCard.append(infoDiv, actionsDiv);
  return doctorCard;
}

/*
Import the overlay function for booking appointments from loggedPatient.js

  Import the deleteDoctor API function to remove doctors (admin role) from docotrServices.js

  Import function to fetch patient details (used during booking) from patientServices.js

  Function to create and return a DOM element for a single doctor card
    Create the main container for the doctor card
    Retrieve the current user role from localStorage
    Create a div to hold doctor information
    Create and set the doctor’s name
    Create and set the doctor's specialization
    Create and set the doctor's email
    Create and list available appointment times
    Append all info elements to the doctor info container
    Create a container for card action buttons
    === ADMIN ROLE ACTIONS ===
      Create a delete button
      Add click handler for delete button
     Get the admin token from localStorage
        Call API to delete the doctor
        Show result and remove card if successful
      Add delete button to actions container
   
    === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
      Create a book now button
      Alert patient to log in before booking
      Add button to actions container
  
    === LOGGED-IN PATIENT ROLE ACTIONS === 
      Create a book now button
      Handle booking logic for logged-in patient   
        Redirect if token not available
        Fetch patient data with token
        Show booking overlay UI with doctor and patient info
      Add button to actions container
   
  Append doctor info and action buttons to the car
  Return the complete doctor card element
*/
