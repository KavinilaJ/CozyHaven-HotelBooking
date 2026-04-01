package com.cozyhaven.hotelbooking.repository;

import com.cozyhaven.hotelbooking.entity.Accommodation;
import com.cozyhaven.hotelbooking.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {

    // Get rooms by property
    List<Accommodation> findByProperty(Property property);
}