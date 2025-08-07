// Dynamically renders the header section based on user role and session status
function renderHeader() {
  const headerDiv = document.getElementById("header");

  // If on the root page, clear user role and show only logo/title
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  // Get user role and token from localStorage
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // Start building header HTML with logo/title
  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav>`;

  // If session is invalid (role present but no token), log out and redirect
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  // Add role-specific navigation/buttons
  if (role === "admin") {
    // Admin: Add Doctor button and Logout
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "doctor") {
    // Doctor: Home button and Logout
    headerContent += `
      <button class="adminBtn" onclick="selectRole('doctor')">Home</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "patient") {
    // Patient (not logged in): Login and Sign Up
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    // Logged-in Patient: Home, Appointments, Logout
    headerContent += `
      <button class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" onclick="logoutPatient()">Logout</a>`;
  }

  // Close nav and header tags
  headerContent += `</nav></header>`;

  // Insert header HTML into the DOM
  headerDiv.innerHTML = headerContent;

  // Attach event listeners to header buttons (if needed)
  attachHeaderButtonListeners();
}
