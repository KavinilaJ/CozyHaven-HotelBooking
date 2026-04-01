package com.cozyhaven.hotelbooking.service;


import java.util.List;

import com.cozyhaven.hotelbooking.dto.LoginDTO;
import com.cozyhaven.hotelbooking.dto.SignupDTO;
import com.cozyhaven.hotelbooking.dto.Userresponsedto;


public interface IUserManagementService {

    String registerUser(SignupDTO dto);

    String loginUser(LoginDTO dto);
    // ✅ ADMIN FEATURES
    List<Userresponsedto> getAllUsers();
    String deleteUser(Long userId);
}
