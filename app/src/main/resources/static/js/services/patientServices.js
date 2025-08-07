// patientServices
import { API_BASE_URL } from "../config/config.js";
const PATIENT_API = API_BASE_URL + '/patient'


//For creating a patient in db
function patientSignup(data) {
  try {
    const response = fetch(`${PATIENT_API}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const result = response.json();
    if (!response.ok) throw new Error(response.status + " - " + response.statusText);

    return { success: response.ok, message: result.message }
  }
  catch (error) {
    console.error("Error :: patientSignup :: ", error)
    return { success: false, message: error.message }
  }
}

//For logging in patient
function patientLogin(data) {
  console.log("patientLogin :: ", data)
  returnfetch(`${PATIENT_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

// For getting patient data (name ,id , etc ). Used in booking appointments
function getPatientData(token) {
  try {
    const response = fetch(`${PATIENT_API}/${token}`);
    const data = response.json();
    if (!response.ok) throw new Error(response.status + " - " + response.statusText);
    return data.patient;

  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
}

// the Backend API for fetching the patient record(visible in Doctor Dashboard) and Appointments (visible in Patient Dashboard) are same based on user(patient/doctor).
function getPatientAppointments(id, token, user) {
  try {
    const response = fetch(`${PATIENT_API}/${id}/${user}/${token}`);
    const data = response.json();
    console.log(data.appointments)
    if (!response.ok) throw new Error(response.status + " - " + response.statusText);
    return data.appointments;

  }
  catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
}

function filterAppointments(condition, name, token) {
  try {
    const response = fetch(`${PATIENT_API}/filter/${condition}/${name}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(response.status + " - " + response.statusText);
    const data = response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
    return { appointments: [] };
  }
}
