package com.cozyhaven.hotelbooking.controller;

import com.cozyhaven.hotelbooking.dto.AccommodationDTO;
import com.cozyhaven.hotelbooking.entity.Accommodation;
import com.cozyhaven.hotelbooking.service.IAccommodationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor
public class AccommodationController {

    private final IAccommodationService accommodationService;

    // Add room
    @PostMapping
    public Accommodation addRoom(@Valid @RequestBody AccommodationDTO dto) {
        return accommodationService.addRoom(dto);
    }

    // Get rooms by property
    @GetMapping("/{propertyId}")
    public List<Accommodation> getRooms(@PathVariable Long propertyId) {
        return accommodationService.getRoomsByProperty(propertyId);
    }
}