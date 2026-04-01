package com.cozyhaven.hotelbooking.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTest {

    private JwtService jwtService = new JwtService();

    @Test
    void testGenerateAndExtract() {

        String token = jwtService.generateToken(1L,"test@gmail.com", "USER"); // ✅ FIXED

        String email = jwtService.extractEmail(token);

        assertEquals("test@gmail.com", email);
    }
}
