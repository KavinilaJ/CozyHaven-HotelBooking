package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.dto.PaymentRequestDTO;
import com.cozyhaven.hotelbooking.entity.Payment;

public interface IPaymentProcessingService {

    Payment processPayment(PaymentRequestDTO dto);
}