package com.cozyhaven.hotelbooking.service.impl;

import com.cozyhaven.hotelbooking.dto.FeedbackDTO;
import com.cozyhaven.hotelbooking.dto.FeedbackResponseDTO;
import com.cozyhaven.hotelbooking.entity.*;
import com.cozyhaven.hotelbooking.repository.*;
import com.cozyhaven.hotelbooking.service.IFeedbackService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements IFeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public Feedback addFeedback(FeedbackDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Feedback feedback = new Feedback();
        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        feedback.setUser(user);
        feedback.setProperty(property);

        return feedbackRepository.save(feedback);
    }
    
    @Override
    public List<Feedback> getFeedbackByUser(Long userId) {
        return feedbackRepository.findByUserUserId(userId);
    }
    private FeedbackResponseDTO convertToDTO(Feedback fb) {
        return new FeedbackResponseDTO(
                fb.getFeedbackId(),
                fb.getRating(),
                fb.getComment(),

                fb.getUser().getUserId(),
                fb.getUser().getName(),
                fb.getUser().getEmail(),

                fb.getProperty().getPropertyId(),
                fb.getProperty().getName()
        );
    }

    @Override
    public List<FeedbackResponseDTO> getFeedbackByProperty(Long propertyId) {
        return feedbackRepository.findByPropertyPropertyId(propertyId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
    @Override
    public List<Feedback> getFeedbackByUserAndProperty(Long userId, Long propertyId) {
        return feedbackRepository.findByUserUserIdAndPropertyPropertyId(userId, propertyId);
    }
}