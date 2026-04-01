package com.cozyhaven.hotelbooking.service.impl;

import com.cozyhaven.hotelbooking.dto.LoginDTO;
import com.cozyhaven.hotelbooking.dto.SignupDTO;
import com.cozyhaven.hotelbooking.dto.Userresponsedto;
import com.cozyhaven.hotelbooking.entity.Role;
import com.cozyhaven.hotelbooking.entity.*;
import com.cozyhaven.hotelbooking.repository.UserRepository;
import com.cozyhaven.hotelbooking.service.IUserManagementService;
import com.cozyhaven.hotelbooking.service.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class UserManagementServiceImpl implements IUserManagementService {
	private static final Logger logger = LoggerFactory.getLogger(UserManagementServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public String registerUser(SignupDTO dto) {

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));        user.setGender(dto.getGender());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setRole(Role.valueOf(dto.getRole().toUpperCase()));

        userRepository.save(user);

        return "User Registered Successfully";
    }

    private final JwtService jwtService;

    @Override
    public String loginUser(LoginDTO dto) {

        logger.info("Login attempt: {}", dto.getEmail());

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        // 🔥 CHECK PASSWORD
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        logger.info("Login success: {}", user.getEmail());

        return jwtService.generateToken(
                user.getUserId(),
                user.getEmail(),
                user.getRole().name()
        );    }
    private Userresponsedto convertToDTO(User user) {
        return new Userresponsedto(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getGender(),
                user.getPhone(),
                user.getAddress(),
                user.getRole()
        );
    }
    @Override
    public List<Userresponsedto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
    @Override
    public String deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);

        return "User deleted successfully";
    }
}