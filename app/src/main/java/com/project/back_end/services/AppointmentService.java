package com.project.back_end.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.back_end.DTO.AppointmentDTO;
import com.project.back_end.models.Appointment;
import com.project.back_end.models.Patient;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final com.project.back_end.services.Service service;
    private final TokenService tokenService;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
            com.project.back_end.services.Service service, TokenService tokenService,
            PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.service = service;
        this.tokenService = tokenService;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // 3. **Add @Transactional Annotation for Methods that Modify Database**:
    // - The methods that modify or update the database should be annotated with
    // `@Transactional` to ensure atomicity and consistency of the operations.
    // - Instruction: Add the `@Transactional` annotation above methods that
    // interact with the database, especially those modifying data.

    /**
     * Books a new appointment by saving it to the database.
     * Returns 1 if successful, 0 otherwise.
     */
    @Transactional
    public int bookAppointment(Appointment appointment) {
        try {
            appointmentRepository.save(appointment);
            return 1;
        } catch (Exception e) {
            // Log the exception if needed
            return 0;
        }
    }

    @Transactional
    public ResponseEntity<Map<String, String>> updateAppointment(Appointment appointment) {
        Map<String, String> response = new HashMap<>();

        Optional<Appointment> result = appointmentRepository.findById(appointment.getId());
        if (!result.isPresent()) {
            response.put("message", "No appointment available with id: " + appointment.getId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        if (result.get().getPatient().getId() != appointment.getPatient().getId()) {
            response.put("message", "Patient Id mismatch");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        int out = service.validateAppointment(appointment);
        if (out == 1) {
            try {
                appointmentRepository.save(appointment);
                response.put("message", "Appointment Updated Successfully");
                return ResponseEntity.status(HttpStatus.OK).body(response);

            } catch (Exception e) {
                System.out.println("Error: " + e);
                response.put("message", "Internal Server Error");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

        } else if (out == -1) {
            response.put("message", "Invalid doctor id");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.put("message", "Appointment already booked for given time or Doctor not available");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    public ResponseEntity<Map<String, String>> cancelAppointment(long id, String token) {
        Map<String, String> response = new HashMap<>();
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        String extractedToken = tokenService.extractEmail(token);
        Patient patient = patientRepository.findByEmail(extractedToken);
        if (patient.getId() != appointment.get().getPatient().getId()) {
            response.put("message", "Patient Id mismatch");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (appointment.isPresent()) {
            try {
                appointmentRepository.delete(appointment.get());
                response.put("message", "Appointment Deleted Successfully");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } catch (Exception e) {
                System.out.println("Error: " + e);
                response.put("message", "Internal Server Error");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }
        response.put("message", "No appointment for given id: " + id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @Transactional
    public Map<String, Object> getAppointment(String pname, LocalDate date, String token) {
        Map<String, Object> map = new HashMap<>();
        String extractedEmail = tokenService.extractEmail(token);
        Long doctorId = doctorRepository.findByEmail(extractedEmail).getId();
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        List<Appointment> appointments;

        if (pname.equals("null")) {
            // If pname is null or empty, fetch all appointments for that date

            appointments = appointmentRepository
                    .findByDoctorIdAndAppointmentTimeBetween(doctorId, startOfDay, endOfDay);
        } else {
            // Filter by patient name
            appointments = appointmentRepository
                    .findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
                            doctorId, pname, startOfDay, endOfDay);
        }

        List<AppointmentDTO> appointmentDTOs = appointments.stream()
                .map(app -> new AppointmentDTO(
                        app.getId(),
                        app.getDoctor().getId(), // Simplified doctor info
                        app.getDoctor().getName(),
                        app.getPatient().getId(),
                        app.getPatient().getName(),
                        app.getPatient().getEmail(),
                        app.getPatient().getPhone(),
                        app.getPatient().getAddress(),
                        app.getAppointmentTime(),
                        app.getStatus()))
                .collect(Collectors.toList());

        map.put("appointments", appointmentDTOs);
        return map;

    }

    @Transactional
    public void changeStatus(long appointmentId) {
        appointmentRepository.updateStatus(1, appointmentId);
    }

}
