## MySQL Database Design

### Table: patients
- id: INT, Primary Key, Auto Increment  
- name: VARCHAR, Not Null  
- birth_date: DATE, Not Null  
- email: VARCHAR, Unique, Not Null  
- phone: VARCHAR  
- password_hash: VARCHAR, Not Null  
- registered_at: DATETIME, DEFAULT CURRENT_TIMESTAMP  

---

### Table: doctors
- id: INT, Primary Key, Auto Increment  
- name: VARCHAR, Not Null  
- email: VARCHAR, Unique, Not Null  
- phone: VARCHAR  
- specialization: VARCHAR, Not Null  
- password_hash: VARCHAR, Not Null  
- clinic_id: INT, Foreign Key → clinic_locations(id)  

---

### Table: admin
- id: INT, Primary Key, Auto Increment  
- name: VARCHAR, Not Null  
- email: VARCHAR, Unique, Not Null  
- password_hash: VARCHAR, Not Null  

---

### Table: clinic_locations
- id: INT, Primary Key, Auto Increment  
- name: VARCHAR, Not Null  
- address: VARCHAR, Not Null  
- city: VARCHAR, Not Null  
- postal_code: VARCHAR  

---

### Table: doctor_availability_patterns
- id: INT, Primary Key, Auto Increment  
- doctor_id: INT, Foreign Key → doctors(id)  
- weekday: INT, Not Null  
  – 0 = Sunday, 1 = Monday ... 6 = Saturday  
- from_time: TIME, Not Null  
- to_time: TIME, Not Null  
- valid_from: DATE, Not Null  
- valid_to: DATE, Nullable (NULL = neomezeně)  
- is_available: BOOLEAN  
  – true = dostupný  
  – false = nedostupný  

---

### Table: doctor_availability_exceptions
- id: INT, Primary Key, Auto Increment  
- doctor_id: INT, Foreign Key → doctors(id)  
- date: DATE, Not Null  
- from_time: TIME (nullable)  
- to_time: TIME (nullable)  
- is_available: BOOLEAN, Not Null  
  – false = výjimečně nedostupný (např. nemoc, dovolená)  
  – true = výjimečně dostupný (např. mimo plánovaný čas)  
- reason: TEXT (optional)  

---

### Table: appointments
- id: INT, Primary Key, Auto Increment  
- doctor_id: INT, Foreign Key → doctors(id)  
- patient_id: INT, Foreign Key → patients(id)  
- appointment_time: DATETIME, Not Null  
- status: INT, Not Null  
  – 0 = Scheduled  
  – 1 = Completed  
  – 2 = Cancelled  

---

### Table: payments
- id: INT, Primary Key, Auto Increment  
- patient_id: INT, Foreign Key → patients(id)  
- amount: DECIMAL(10,2), Not Null  
- method: VARCHAR, Not Null  
  – 'card', 'cash', 'paypal'  
- status: VARCHAR, Not Null  
  – 'pending', 'paid', 'failed'  
- paid_at: DATETIME (nullable)  
- description: TEXT (optional) – např. „záloha“, „poplatek za dokumentaci“  

## MongoDB Collection Design

### 📦 Collection: prescriptions
``` javascript
{
  “_id”: “ObjectId(‘64abc123456’)”,
  “patientId”: 102,
  “patientName”: “John Smith”,
  “doctorId”: 7,
  “doctorName”: “Dr. Alice Morgan”,

  “issuedAt”: “2025-08-06T09:30:00Z”,
  “medications”:
      {
        “name”: “Paracetamol”,
        “dosage”: “500mg”,
        “instructions”: “Take 1 tablet every 6 hours.”,
         “refillCount”: 2
      },
       {
        “name”: “Ibuprofen”,
        “dosage”: “200mg”,
         “instructions”: “Take as needed for pain.”
      } ,
  “attachments”:
      {
         “fileName”: “instructions.pdf”,
        “fileType”: “application/pdf”,
         “url”: “https://clinic.example.com/files/johnsmith/instructions-paracetamol.pdf”
      }
   “metadata”: {
      “createdAt”: “2025-08-06T09:35:00Z”,
}
```
