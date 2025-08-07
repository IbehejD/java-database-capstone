import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';


const ADMIN_API = `${API_BASE_URL}/api/admin/login`;
const DOCTOR_API = `${API_BASE_URL}/api/doctor/login`;

window.onload = function () {
  const adminLoginBtn = document.getElementById('admin-btn');
  const doctorLoginBtn = document.getElementById('doctor-btn');

  if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', () => openModal('adminLogin'));
  }
  if (doctorLoginBtn) {
    doctorLoginBtn.addEventListener('click', () => openModal('doctorLogin'));
  }
};

window.adminLoginHandler = async function () {
  try {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const admin = { username, password };

    const response = await fetch(ADMIN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      selectRole('admin');
    } else {
      alert('Invalid admin credentials. Please try again.');
    }
  } catch (error) {
    alert('An error occurred during admin login. Please try again later.');
  }
};

window.doctorLoginHandler = async function () {
  try {
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;
    const doctor = { email, password };

    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      selectRole('doctor');
    } else {
      alert('Invalid doctor credentials. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during doctor login. Please try again later.');
  }
};
