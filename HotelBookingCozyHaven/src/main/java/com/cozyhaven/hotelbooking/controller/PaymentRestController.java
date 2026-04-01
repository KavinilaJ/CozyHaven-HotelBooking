package com.cozyhaven.hotelbooking.controller;

import com.cozyhaven.hotelbooking.dto.PaymentRequestDTO;
import com.cozyhaven.hotelbooking.entity.Payment;
import com.cozyhaven.hotelbooking.service.IPaymentProcessingService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentRestController {

    private final IPaymentProcessingService paymentService;

    @PostMapping
    public Payment pay(@Valid @RequestBody PaymentRequestDTO dto) {
        return paymentService.processPayment(dto);
    }
}