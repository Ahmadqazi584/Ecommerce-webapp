package com.ecommerce.webstore_app.security.request;

import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @Setter
    @Getter
    private List<String> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}