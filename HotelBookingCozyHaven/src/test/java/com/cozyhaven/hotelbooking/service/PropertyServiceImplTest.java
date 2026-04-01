package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.entity.Property;
import com.cozyhaven.hotelbooking.repository.PropertyRepository;
import com.cozyhaven.hotelbooking.service.impl.PropertyServiceImpl;

import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PropertyServiceImplTest {

    @Mock
    private PropertyRepository repository;

    @InjectMocks
    private PropertyServiceImpl service;

    public PropertyServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSearchByLocation() {

        when(repository.findByLocationContainingIgnoreCase("Chennai"))
                .thenReturn(List.of(new Property()));

        List<Property> result = service.searchByLocation("Chennai");

        assertFalse(result.isEmpty());
    }
}