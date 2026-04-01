package com.cozyhaven.hotelbooking.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationDTO {

    @NotNull
    private Long userId;

    @NotNull
    private Long roomId;

    @NotNull
    private LocalDate checkIn;

    @NotNull
    private LocalDate checkOut;

    @Min(1)
    private int adults;

    @Min(0)
    private int children;
}
