package com.cozyhaven.hotelbooking.dto;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponseDTO {

    private Long reservationId;

    private String userName;
    private String userEmail;

    private String propertyName;
    private String roomType;

    private String status;
    private String checkInDate;
    private String checkOutDate;
}