package com.cozyhaven.hotelbooking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String roomSize;

    private String bedType; // SINGLE, DOUBLE, KING

    private int maxPeople;

    private double baseFare;

    private boolean ac;

    // Relationships

    @ManyToOne
    @JoinColumn(name = "property_id")
    @JsonIgnore 
    private Property property;

    @OneToMany(mappedBy = "room")
    @JsonIgnore 
    private List<Reservation> reservations;
}
