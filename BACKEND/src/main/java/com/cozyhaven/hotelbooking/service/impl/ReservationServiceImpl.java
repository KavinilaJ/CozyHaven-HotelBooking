package com.cozyhaven.hotelbooking.service.impl;

import com.cozyhaven.hotelbooking.dto.ReservationDTO;
import com.cozyhaven.hotelbooking.dto.ReservationResponseDTO;
import com.cozyhaven.hotelbooking.entity.*;
import com.cozyhaven.hotelbooking.repository.*;
import com.cozyhaven.hotelbooking.service.IReservationService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements IReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final AccommodationRepository accommodationRepository;

    @Override
    public Reservation createReservation(ReservationDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Accommodation room = accommodationRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setRoom(room);
        reservation.setCheckIn(dto.getCheckIn());
        reservation.setCheckOut(dto.getCheckOut());
        reservation.setAdults(dto.getAdults());
        reservation.setChildren(dto.getChildren());

        // 🔥 Basic price (we will improve later)
        reservation.setTotalPrice(room.getBaseFare());

        reservation.setStatus("CONFIRMED");

        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getUserReservations(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return reservationRepository.findByUser(user);
    }

    @Override
    public String cancelReservation(Long reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus("CANCELLED");
        reservationRepository.save(reservation);

        return "Reservation Cancelled Successfully";
    }
    private ReservationResponseDTO convertToDTO(Reservation r) {
        return new ReservationResponseDTO(
                r.getReservationId(),
                r.getUser().getName(),
                r.getUser().getEmail(),
                r.getRoom().getProperty().getName(), // ✅ FIXED
                r.getRoom().getBedType(),
                r.getStatus(),
                r.getCheckIn().toString(),
                r.getCheckOut().toString()
        );
    }
    
    @Override
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(java.util.stream.Collectors.toList());
    }
    @Override
    public List<ReservationResponseDTO> getOwnerReservations(String email) {

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        return reservationRepository
                .findByRoomPropertyOwnerUserId(owner.getUserId())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

}