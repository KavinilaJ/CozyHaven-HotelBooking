package com.cozyhaven.hotelbooking.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class SignupDTO {
	    @NotBlank(message = "Name is required")
	    private String name;

	    @Email(message = "Invalid email")
	    @NotBlank(message = "Email is required")
	    private String email;

	    @Size(min = 6, message = "Password must be at least 6 characters")
	    private String password;

	    @NotBlank(message = "Gender is required")
	    private String gender;

	    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
	    private String phone;

	    @NotBlank(message = "Address is required")
	    private String address;

	    @NotBlank(message = "Role is required")
	    private String role;
}
