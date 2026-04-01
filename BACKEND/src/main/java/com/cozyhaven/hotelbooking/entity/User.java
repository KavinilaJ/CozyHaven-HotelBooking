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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String gender;

    private String phone;

    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Relationships

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "user")
    @JsonIgnore 
    private List<Feedback> feedbacks;
}