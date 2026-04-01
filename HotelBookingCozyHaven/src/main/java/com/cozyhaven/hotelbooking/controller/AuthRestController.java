package com.cozyhaven.hotelbooking.controller;

import com.cozyhaven.hotelbooking.dto.LoginDTO;
import com.cozyhaven.hotelbooking.dto.SignupDTO;
import com.cozyhaven.hotelbooking.service.IUserManagementService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final IUserManagementService userService;

    // ✅ Register
    @PostMapping("/register")
    public String register(@Valid @RequestBody SignupDTO dto) {
        return userService.registerUser(dto);
    }

    // ✅ Login
    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginDTO dto) {
        return userService.loginUser(dto);
    }
}
