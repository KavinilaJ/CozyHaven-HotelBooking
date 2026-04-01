package com.cozyhaven.hotelbooking.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class AccommodationDTO {

    @NotBlank(message = "Room size required")
    private String roomSize;

    @NotBlank(message = "Bed type required")
    private String bedType;

    @Min(1)
    private int maxPeople;

    @Positive
    private double baseFare;

    private boolean ac;

    @NotNull
    private Long propertyId;
}