package com.cozyhaven.hotelbooking.repository;

import com.cozyhaven.hotelbooking.entity.Reservation;
import com.cozyhaven.hotelbooking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Get bookings by user
    List<Reservation> findByUser(User user);

List<Reservation> findByRoomPropertyOwnerUserId(Long ownerId);
}
