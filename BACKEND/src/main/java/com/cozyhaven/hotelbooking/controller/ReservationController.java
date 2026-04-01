package com.cozyhaven.hotelbooking.controller;

import com.cozyhaven.hotelbooking.dto.ReservationDTO;
import com.cozyhaven.hotelbooking.dto.ReservationResponseDTO;
import com.cozyhaven.hotelbooking.entity.Reservation;
import com.cozyhaven.hotelbooking.service.IReservationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final IReservationService reservationService;

    // Create booking
    @PostMapping
    public Reservation create(@Valid @RequestBody ReservationDTO dto) {
        return reservationService.createReservation(dto);
    }

    // Get user bookings
    @GetMapping("/user/{userId}")
    public List<Reservation> getUserBookings(@PathVariable Long userId) {
        return reservationService.getUserReservations(userId);
    }

    // Cancel booking
    @PutMapping("/cancel/{id}")
    public String cancel(@PathVariable Long id) {
        return reservationService.cancelReservation(id);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationService.getAllReservations();
    }
    
    @GetMapping("/owner")
    public List<ReservationResponseDTO> getOwnerBookings() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return reservationService.getOwnerReservations(email);
    }
}