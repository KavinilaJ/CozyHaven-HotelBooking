package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.entity.*;
import com.cozyhaven.hotelbooking.dto.*;
import com.cozyhaven.hotelbooking.repository.*;
import com.cozyhaven.hotelbooking.service.impl.FeedbackServiceImpl;

import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FeedbackServiceImplTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PropertyRepository propertyRepository;

    @InjectMocks
    private FeedbackServiceImpl service;

    public FeedbackServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddFeedback() {

        FeedbackDTO dto = new FeedbackDTO();
        dto.setUserId(1L);
        dto.setPropertyId(1L);
        dto.setRating(5);
        dto.setComment("Good");

        User user = new User();
        Property property = new Property();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(propertyRepository.findById(1L)).thenReturn(Optional.of(property));

        when(feedbackRepository.save(any(Feedback.class)))
                .thenReturn(new Feedback());

        Feedback result = service.addFeedback(dto);

        assertNotNull(result);
    }
}