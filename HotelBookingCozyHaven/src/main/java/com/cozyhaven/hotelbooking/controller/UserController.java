package com.cozyhaven.hotelbooking.controller;




import com.cozyhaven.hotelbooking.dto.Userresponsedto;
import com.cozyhaven.hotelbooking.service.IUserManagementService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin("*") // allow frontend (React)
public class UserController {

    private final IUserManagementService userService;


    // ✅ VIEW ALL USERS
    @GetMapping("/all")
    public List<Userresponsedto> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }
}