package com.cozyhaven.hotelbooking.service.impl;

import com.cozyhaven.hotelbooking.dto.PaymentRequestDTO;
import com.cozyhaven.hotelbooking.entity.Payment;
import com.cozyhaven.hotelbooking.entity.Reservation;
import com.cozyhaven.hotelbooking.repository.PaymentRepository;
import com.cozyhaven.hotelbooking.repository.ReservationRepository;
import com.cozyhaven.hotelbooking.service.IPaymentProcessingService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentProcessingServiceImpl implements IPaymentProcessingService {

    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public Payment processPayment(PaymentRequestDTO dto) {

        Reservation reservation = reservationRepository.findById(dto.getReservationId())
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        Payment payment = new Payment();
        payment.setAmount(dto.getAmount());
        payment.setStatus("SUCCESS");
        payment.setReservation(reservation);

        return paymentRepository.save(payment);
    }
}