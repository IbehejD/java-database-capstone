package com.project.back_end.repo;

import com.project.back_end.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

   // 1. Najdi všechny schůzky pro daného doktora v časovém intervalu (vč. vazeb)
   @Query("SELECT a FROM Appointment a " +
         "LEFT JOIN FETCH a.doctor d " +
         "LEFT JOIN FETCH a.availability av " +
         "WHERE d.id = :doctorId AND a.appointmentTime BETWEEN :start AND :end")
   List<Appointment> findByDoctorIdAndAppointmentTimeBetween(Long doctorId, LocalDateTime start, LocalDateTime end);

   // 2. Najdi schůzky pro doktora podle části jména pacienta a časového intervalu
   // (case-insensitive)
   @Query("SELECT a FROM Appointment a " +
         "LEFT JOIN FETCH a.patient p " +
         "LEFT JOIN FETCH a.doctor d " +
         "WHERE d.id = :doctorId AND LOWER(p.name) LIKE LOWER(CONCAT('%', :patientName, '%')) " +
         "AND a.appointmentTime BETWEEN :start AND :end")
   List<Appointment> findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
         Long doctorId,
         String patientName,
         LocalDateTime start,
         LocalDateTime end);

   // 3. Smaž všechny schůzky daného doktora
   @Modifying
   @Transactional
   void deleteAllByDoctorId(Long doctorId);

   // 4. Najdi všechny schůzky pacienta
   List<Appointment> findByPatientId(Long patientId);

   // 5. Najdi schůzky pacienta podle stavu, seřazeno dle času
   List<Appointment> findByPatient_IdAndStatusOrderByAppointmentTimeAsc(Long patientId, int status);

   // 6. Vyhledej schůzky pacienta podle části jména doktora
   @Query("SELECT a FROM Appointment a " +
         "JOIN a.doctor d " +
         "WHERE a.patient.id = :patientId AND LOWER(d.name) LIKE LOWER(CONCAT('%', :doctorName, '%'))")
   List<Appointment> filterByDoctorNameAndPatientId(String doctorName, Long patientId);

   // 7. Vyhledej schůzky pacienta podle jména doktora a stavu
   @Query("SELECT a FROM Appointment a " +
         "JOIN a.doctor d " +
         "WHERE a.patient.id = :patientId AND a.status = :status " +
         "AND LOWER(d.name) LIKE LOWER(CONCAT('%', :doctorName, '%'))")
   List<Appointment> filterByDoctorNameAndPatientIdAndStatus(String doctorName, Long patientId, int status);

   @Modifying
   @Query("UPDATE Appointment a SET a.status = :status WHERE a.id = :id")
   void updateStatus(int status, long id);

}
