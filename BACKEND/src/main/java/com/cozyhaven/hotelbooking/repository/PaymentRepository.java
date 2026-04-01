package com.cozyhaven.hotelbooking.repository;


import com.cozyhaven.hotelbooking.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
