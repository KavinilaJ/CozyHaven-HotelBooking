package com.cozyhaven.hotelbooking.controller;

import com.cozyhaven.hotelbooking.dto.FeedbackDTO;
import com.cozyhaven.hotelbooking.dto.FeedbackResponseDTO;
import com.cozyhaven.hotelbooking.entity.Feedback;
import com.cozyhaven.hotelbooking.service.IFeedbackService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feedback")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FeedbackController {

    private final IFeedbackService feedbackService;

    // ✅ Add feedback
    @PostMapping
    public Feedback addFeedback(@RequestBody FeedbackDTO dto) {
        return feedbackService.addFeedback(dto);
    }

    // ✅ Get by user
    @GetMapping("/user/{userId}")
    public List<Feedback> getByUser(@PathVariable Long userId) {
        return feedbackService.getFeedbackByUser(userId);
    }

    // ✅ Get by property
    @GetMapping("/property/{propertyId}")
    public List<FeedbackResponseDTO> getByProperty(@PathVariable Long propertyId) {
        return feedbackService.getFeedbackByProperty(propertyId);
    }
    // ✅ Get by user + property
    @GetMapping("/user/{userId}/property/{propertyId}")
    public List<Feedback> getByUserAndProperty(
            @PathVariable Long userId,
            @PathVariable Long propertyId) {

        return feedbackService.getFeedbackByUserAndProperty(userId, propertyId);
    }
}