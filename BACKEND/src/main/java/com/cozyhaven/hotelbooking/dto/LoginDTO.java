package com.cozyhaven.hotelbooking.dto;

import jakarta.validation.constraints.*;
import lombok.*;
@Getter
@Setter
public class LoginDTO {

	    @Email(message = "Invalid email")
	    @NotBlank(message = "Email required")
	    private String email;

	    @NotBlank(message = "Password required")
	    private String password;
}
