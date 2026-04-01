package com.cozyhaven.hotelbooking.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    // Relationships

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonIgnore 
    private Accommodation room;

    private LocalDate checkIn;

    private LocalDate checkOut;

    private int adults;

    private int children;

    private double totalPrice;

    private String status; // CONFIRMED / CANCELLED
}
