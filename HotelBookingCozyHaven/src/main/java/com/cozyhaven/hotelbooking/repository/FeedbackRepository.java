package com.cozyhaven.hotelbooking.repository;


import com.cozyhaven.hotelbooking.entity.Feedback;
import com.cozyhaven.hotelbooking.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // Get reviews for a property
    List<Feedback> findByProperty(Property property);
    
    List<Feedback> findByUserUserId(Long userId);

    // ✅ Get feedback by property
    List<Feedback> findByPropertyPropertyId(Long propertyId);

    // ✅ Get feedback by both user & property
    List<Feedback> findByUserUserIdAndPropertyPropertyId(Long userId, Long propertyId);
}
