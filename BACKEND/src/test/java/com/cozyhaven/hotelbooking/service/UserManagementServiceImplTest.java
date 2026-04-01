package com.cozyhaven.hotelbooking.service;

import com.cozyhaven.hotelbooking.dto.LoginDTO;
import com.cozyhaven.hotelbooking.entity.User;
import com.cozyhaven.hotelbooking.repository.UserRepository;
import com.cozyhaven.hotelbooking.service.impl.UserManagementServiceImpl;
import com.cozyhaven.hotelbooking.entity.Role;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserManagementServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;   // 🔥 IMPORTANT

    @InjectMocks
    private UserManagementServiceImpl service;

    public UserManagementServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginUser() {

        LoginDTO dto = new LoginDTO();
        dto.setEmail("test@gmail.com");

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setRole(Role.USER); // 🔥 IMPORTANT

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        // 🔥 FIX HERE (2 params)
        when(jwtService.generateToken(1L,"test@gmail.com", "USER"))
                .thenReturn("mock-token");

        String result = service.loginUser(dto);

        assertEquals("mock-token", result);
    }
}