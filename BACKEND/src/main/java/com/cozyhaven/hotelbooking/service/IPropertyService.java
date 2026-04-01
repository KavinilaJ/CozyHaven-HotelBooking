package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.dto.PropertyDTO;
import com.cozyhaven.hotelbooking.entity.Property;

import java.util.List;

public interface IPropertyService {

    Property addProperty(PropertyDTO dto);

    List<Property> searchByLocation(String location);
    List<Property> getAllProperties();
}