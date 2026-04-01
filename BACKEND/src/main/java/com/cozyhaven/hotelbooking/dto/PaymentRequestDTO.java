package com.cozyhaven.hotelbooking.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class PaymentRequestDTO {

    @NotNull
    private Long reservationId;

    @Positive
    private double amount;
}
