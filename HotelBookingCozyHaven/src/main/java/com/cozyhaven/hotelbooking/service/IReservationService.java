package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.dto.ReservationDTO;
import com.cozyhaven.hotelbooking.dto.ReservationResponseDTO;
import com.cozyhaven.hotelbooking.entity.Reservation;

import java.util.List;

public interface IReservationService {

    Reservation createReservation(ReservationDTO dto);

    List<Reservation> getUserReservations(Long userId);

    String cancelReservation(Long reservationId);
    List<ReservationResponseDTO> getAllReservations();

	List<ReservationResponseDTO> getOwnerReservations(String email);
}