# Admin User Stories

**Title:**  
_As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**  
1. Login form accepts valid username and password.  
2. Access to admin functions only after successful authentication.  
3. Invalid credentials are rejected with appropriate feedback.

**Priority:** High  
**Story Points:** 5  
**Notes:**  

**Title:**  
_As an admin, I want to log out of the portal, so that I can protect system access when I leave._

**Acceptance Criteria:**  
1. Logout button is available in the admin dashboard.  
2. Session is terminated upon logout.  
3. User is redirected to the login page after logout.

**Priority:** High  
**Story Points:** 5
**Notes:**  

**Title:**  
_As an admin, I want to add doctors to the portal, so that new doctors can access and use the system._

**Acceptance Criteria:**  
1. Admin can enter doctor details and create a new account.  
2. Doctors receive notification with login details.  
3. Duplicate doctor records are prevented.

**Priority:** High  
**Story Points:** 3 
**Notes:**  

**Title:**  
_As an admin, I want to delete a doctor's profile from the portal, so that I can remove access for doctors who have left._

**Acceptance Criteria:**  
1. Admin can select and delete an existing doctor profile.  
2. System prompts for confirmation before deletion.  
3. Deleted doctors lose access immediately.

**Priority:** Medium  
**Story Points:** 3
**Notes:**  

**Title:**  
_As an admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics._

**Acceptance Criteria:**  
1. Stored procedure calculates appointment counts by month.  
2. Admin can access or trigger procedure through CLI or application interface.  
3. Results are displayed in a clear, tabular format.

**Priority:** Medium  
**Story Points:** 3
**Notes:**  

# Patient User Stories

Here are the patient user stories formatted using your provided template, ready to be added as issues to your project tracking system (e.g., GitHub Issues, Jira, Notion, etc.):

**Title:**  
_As a patient, I want to view a list of doctors without logging in, so that I can explore my options before registering._

**Acceptance Criteria:**  
1. Public doctor list is accessible via a "Browse Doctors" page on the portal.  
2. Each doctor profile includes specialties, availability summary, and basic details.  
3. No sensitive or private data is shown without login.

**Priority:** Medium  
**Story Points:** 3 
**Notes:**  


**Title:**  
_As a patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**  
1. Patient registration page collects valid email and password.  
2. Password is stored securely using hashing.  
3. User receives confirmation upon successful signup.

**Priority:** High  
**Story Points:** 5 
**Notes:**  


**Title:**  
_As a patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**  
1. Login screen authenticates email and password correctly.  
2. Authenticated patients are redirected to their dashboard.  
3. Unsuccessful login attempts show error messages.

**Priority:** High  
**Story Points:** 5
**Notes:**  


**Title:**  
_As a patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**  
1. A logout option is always visible when logged in.  
2. Logout removes active sessions and redirects to login.  
3. Protected routes are no longer accessible after logout.

**Priority:** High  
**Story Points:** 5
**Notes:**  


**Title:**  
_As a patient, I want to log in and book an hour-long appointment to consult with a doctor._

**Acceptance Criteria:**  
1. Patients can select a doctor, choose a time slot, and confirm a booking.  
2. Appointment is saved to the system and visible in the booking history.  
3. Duration is fixed at one hour per booking.

**Priority:** High  
**Story Points:** 3
**Notes:**  


**Title:**  
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**  
1. patient dashboard lists all upcoming future appointments.  
2. Each entry includes date, time, doctor name, and status.  
3. Past appointments are hidden or shown in a separate section.

**Priority:** Medium  
**Story Points:** 3
**Notes:**  

# Doctor User Stories

Here are the **doctor user stories** formatted using the user story template, ready to be added as project issues or documentation:

**Title:**  
_As a doctor, I want to log into the portal to manage my appointments._

**Acceptance Criteria:**  
1. Doctor dashboard is accessible only after successful login.  
2. Login inputs support registered email and password.  
3. Incorrect login attempts show appropriate error messages.

**Priority:** High  
**Story Points:** 5
**Notes:**  

**Title:**  
_As a doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**  
1. A logout button is always accessible on the dashboard.  
2. The session is properly terminated.  
3. Access to secure pages is blocked after logout.

**Priority:** High  
**Story Points:** 5 
**Notes:**  

**Title:**  
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**  
1. The calendar displays all scheduled appointments.  
2. Appointments are shown with time, patient, and reason for visit.  
3. Doctors can view appointments by day, week, or month.

**Priority:** High  
**Story Points:** 3 
**Notes:**  

**Title:**  
_As a doctor, I want to mark my unavailability, so that patients only see when I'm available._

**Acceptance Criteria:**  
1. Doctors can block entire days or time slots as unavailable.  
2. Blocked slots are excluded from patient booking options.  
3. Future changes reflect in real-time for booking logic.

**Priority:** High  
**Story Points:** [Estimate here]  
**Notes:**  

**Title:**  
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**  
1. Doctors can edit their profile, including name, specialization, and contact details.  
2. Changes are saved and reflected on the public doctor list.  
3. Field validation ensures correct input.

**Priority:** Medium  
**Story Points:** 3
**Notes:**  

**Title:**  
_As a doctor, I want to view the patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**  
1. Each appointment entry includes access to patient profile (name, age, history, medical notes).  
2. Only patients with confirmed appointments can be viewed.  
3. Sensitive data is shown only to assigned doctors.

**Priority:** High  
**Story Points:** 3
**Notes:**  




