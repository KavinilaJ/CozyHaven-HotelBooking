package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.entity.*;
import com.cozyhaven.hotelbooking.dto.*;
import com.cozyhaven.hotelbooking.repository.*;
import com.cozyhaven.hotelbooking.service.impl.PaymentProcessingServiceImpl;

import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PaymentProcessingServiceImplTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private PaymentProcessingServiceImpl service;

    public PaymentProcessingServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testProcessPayment() {

        PaymentRequestDTO dto = new PaymentRequestDTO();
        dto.setReservationId(1L);
        dto.setAmount(1000);

        Reservation reservation = new Reservation();

        when(reservationRepository.findById(1L))
                .thenReturn(Optional.of(reservation));

        when(paymentRepository.save(any(Payment.class)))
                .thenReturn(new Payment());

        Payment result = service.processPayment(dto);

        assertNotNull(result);
    }
}