package com.cozyhaven.hotelbooking.service.impl;

import com.cozyhaven.hotelbooking.dto.AccommodationDTO;
import com.cozyhaven.hotelbooking.entity.Accommodation;
import com.cozyhaven.hotelbooking.entity.Property;
import com.cozyhaven.hotelbooking.repository.AccommodationRepository;
import com.cozyhaven.hotelbooking.repository.PropertyRepository;
import com.cozyhaven.hotelbooking.service.IAccommodationService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationServiceImpl implements IAccommodationService {

    private final AccommodationRepository accommodationRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public Accommodation addRoom(AccommodationDTO dto) {

        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Accommodation room = new Accommodation();
        room.setRoomSize(dto.getRoomSize());
        room.setBedType(dto.getBedType());
        room.setMaxPeople(dto.getMaxPeople());
        room.setBaseFare(dto.getBaseFare());
        room.setAc(dto.isAc());
        room.setProperty(property);

        return accommodationRepository.save(room);
    }

    @Override
    public List<Accommodation> getRoomsByProperty(Long propertyId) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        return accommodationRepository.findByProperty(property);
    }
}