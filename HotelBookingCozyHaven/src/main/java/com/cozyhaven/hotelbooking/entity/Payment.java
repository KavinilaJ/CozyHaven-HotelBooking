package com.cozyhaven.hotelbooking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private double amount;

    private String status;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    @JsonIgnore   // 🔥 ADD THIS
    private Reservation reservation;
}

