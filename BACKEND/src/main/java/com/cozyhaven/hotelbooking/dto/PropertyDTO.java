package com.cozyhaven.hotelbooking.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter

public class PropertyDTO {

    @NotBlank(message = "Property name required")
    private String name;

    @NotBlank(message = "Location required")
    private String location;

    @NotBlank(message = "Amenities required")
    private String amenities;

    @NotNull(message = "Owner ID required")
    private Long ownerId;
}