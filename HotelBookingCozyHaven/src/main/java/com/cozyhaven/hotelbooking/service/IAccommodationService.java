package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.dto.AccommodationDTO;
import com.cozyhaven.hotelbooking.entity.Accommodation;

import java.util.List;

public interface IAccommodationService {

    Accommodation addRoom(AccommodationDTO dto);

    List<Accommodation> getRoomsByProperty(Long propertyId);
}