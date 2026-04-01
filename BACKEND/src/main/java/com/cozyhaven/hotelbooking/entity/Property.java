package com.cozyhaven.hotelbooking.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;

    private String name;

    private String location;

    private String amenities;

    // Relationships

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User owner;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    @JsonIgnore 
    private List<Accommodation> rooms;

    @OneToMany(mappedBy = "property")
    @JsonIgnore 
    private List<Feedback> feedbacks;
}