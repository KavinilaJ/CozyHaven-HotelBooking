package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.entity.*;
import com.cozyhaven.hotelbooking.repository.*;
import com.cozyhaven.hotelbooking.service.impl.AccommodationServiceImpl;

import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AccommodationServiceImplTest {

    @Mock
    private AccommodationRepository roomRepository;

    @Mock
    private PropertyRepository propertyRepository;

    @InjectMocks
    private AccommodationServiceImpl service;

    public AccommodationServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetRoomsByProperty() {

        Property property = new Property();
        property.setPropertyId(1L);

        when(propertyRepository.findById(1L))
                .thenReturn(Optional.of(property));

        when(roomRepository.findByProperty(property))
                .thenReturn(List.of(new Accommodation()));

        List<Accommodation> result = service.getRoomsByProperty(1L);

        assertFalse(result.isEmpty());
    }
}