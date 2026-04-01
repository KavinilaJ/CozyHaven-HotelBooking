package com.cozyhaven.hotelbooking.repository;

import com.cozyhaven.hotelbooking.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    // Search by location
    List<Property> findByLocationContainingIgnoreCase(String location);
}
