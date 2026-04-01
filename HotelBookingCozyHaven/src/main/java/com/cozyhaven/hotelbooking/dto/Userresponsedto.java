package com.cozyhaven.hotelbooking.dto;


import com.cozyhaven.hotelbooking.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Userresponsedto {

    private Long userId;
    private String name;
    private String email;
    private String gender;
    private String phone;
    private String address;
    private Role role;
}