package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.entity.*;
import com.cozyhaven.hotelbooking.dto.*;
import com.cozyhaven.hotelbooking.repository.*;
import com.cozyhaven.hotelbooking.service.impl.ReservationServiceImpl;

import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReservationServiceImplTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AccommodationRepository roomRepository;

    @InjectMocks
    private ReservationServiceImpl service;

    public ReservationServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateReservation() {

        ReservationDTO dto = new ReservationDTO();
        dto.setUserId(1L);
        dto.setRoomId(1L);

        User user = new User();
        Accommodation room = new Accommodation();
        room.setBaseFare(1000);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));

        when(reservationRepository.save(any(Reservation.class)))
                .thenReturn(new Reservation());

        Reservation result = service.createReservation(dto);

        assertNotNull(result);
    }
}
