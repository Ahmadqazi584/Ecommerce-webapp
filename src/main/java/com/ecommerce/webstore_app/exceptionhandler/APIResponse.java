package com.ecommerce.webstore_app.exceptionhandler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class APIResponse {

    private String message;
    private boolean status;
    private LocalDateTime timestamp;

}
