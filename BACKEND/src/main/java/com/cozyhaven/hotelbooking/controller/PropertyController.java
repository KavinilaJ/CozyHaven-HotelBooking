package com.cozyhaven.hotelbooking.controller;

import com.cozyhaven.hotelbooking.dto.PropertyDTO;
import com.cozyhaven.hotelbooking.entity.Property;
import com.cozyhaven.hotelbooking.service.IPropertyService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final IPropertyService propertyService;

    // Add property
    @PostMapping
    public Property addProperty(@Valid @RequestBody PropertyDTO dto) {
        return propertyService.addProperty(dto);
    }

    // Search by location
    @GetMapping("/search")
    public List<Property> search(@RequestParam(required = false) String location) {

        if (location == null || location.isEmpty()) {
            return propertyService.getAllProperties();
        }

        return propertyService.searchByLocation(location);
    }
    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }
}