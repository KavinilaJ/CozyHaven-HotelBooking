package com.cozyhaven.hotelbooking.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class FeedbackDTO {

    @Min(1)
    @Max(5)
    private int rating;

    @NotBlank
    private String comment;

    @NotNull
    private Long userId;

    @NotNull
    private Long propertyId;
}
