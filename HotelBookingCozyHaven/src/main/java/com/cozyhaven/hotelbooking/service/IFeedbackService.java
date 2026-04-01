package com.cozyhaven.hotelbooking.service;

import java.util.List;

import com.cozyhaven.hotelbooking.dto.FeedbackDTO;
import com.cozyhaven.hotelbooking.dto.FeedbackResponseDTO;
import com.cozyhaven.hotelbooking.entity.Feedback;

public interface IFeedbackService {

    Feedback addFeedback(FeedbackDTO dto);
    List<Feedback> getFeedbackByUser(Long userId);

    List<FeedbackResponseDTO> getFeedbackByProperty(Long propertyId);

    List<Feedback> getFeedbackByUserAndProperty(Long userId, Long propertyId);
}