package com.cozyhaven.hotelbooking.service.impl;

import com.cozyhaven.hotelbooking.dto.PropertyDTO;
import com.cozyhaven.hotelbooking.entity.Property;
import com.cozyhaven.hotelbooking.entity.User;
import com.cozyhaven.hotelbooking.repository.PropertyRepository;
import com.cozyhaven.hotelbooking.repository.UserRepository;
import com.cozyhaven.hotelbooking.service.IPropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements IPropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Override
    public Property addProperty(PropertyDTO dto) {

        User owner = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Property property = new Property();
        property.setName(dto.getName());
        property.setLocation(dto.getLocation());
        property.setAmenities(dto.getAmenities());
        property.setOwner(owner);

        return propertyRepository.save(property);
    }

    @Override
    public List<Property> searchByLocation(String location) {
        return propertyRepository.findByLocationContainingIgnoreCase(location);
    }
    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
}