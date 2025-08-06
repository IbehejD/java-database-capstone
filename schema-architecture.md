# Architecture summary
The Smart Clinic application follows a layered Spring Boot architecture that integrates both server-rendered and API-driven components. It supports multiple user roles through a combination of MVC controllers with Thymeleaf templates (for Admin and Doctor dashboards) and REST controllers (for API-based access to modules like Patient Records, Appointments, and Dashboards).
The backend communicates with two complementary database systems:

- MySQL is used for structured, relational data such as patients, doctors, appointments, and admin entities. These are represented as JPA entities annotated with `@Entity` and managed using Spring Data JPA.
- MongoDB is used for flexible, document-based storage of prescriptions. Prescription data is modeled using `@Document` classes and accessed via Spring Data MongoDB repositories.

All incoming requests—whether from web dashboards or API clients—are routed through controllers that delegate to a centralized Service Layer. This layer handles:

- Business logic and validations
- Cross-entity coordination (e.g., availability checks, workflow sequencing)
- Clean separation between controllers and data access

The Service Layer interacts with specialized Repository interfaces, each mapped to the appropriate persistence engine (JPA or MongoDB), ensuring a decoupled and maintainable system.
This architecture supports both traditional full-page rendering via MVC and scalable client-server communication through REST APIs, while leveraging optimized data handling across MySQL and MongoDB based on data structure needs.

# Numbered flow of data and control
1.	User accesses AdminDashboard, DoctorDashboard, or REST-based modules like Appointments or PatientDashboard.
2.	The request is routed to a Thymeleaf controller (MVC) or REST controller based on URL and HTTP method.
3.	The controller delegates the request to the appropriate method in the Service Layer.
4.	The Service Layer applies business logic, validates input, and orchestrates actions between domain models.
5.	The Service Layer calls the corresponding JPA or MongoDB repository to fetch or persist data.
6.	The Repository Layer communicates with either MySQL or MongoDB to complete the data operation.
7.	The controller prepares a response—either rendering a Thymeleaf template or returning JSON via REST.