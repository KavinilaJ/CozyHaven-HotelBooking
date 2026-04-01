package com.cozyhaven.hotelbooking.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackResponseDTO {

    private Long feedbackId;
    private int rating;
    private String comment;

    // ✅ User details
    private Long userId;
    private String userName;
    private String userEmail;

    // ✅ Property details
    private Long propertyId;
    private String propertyName;
}