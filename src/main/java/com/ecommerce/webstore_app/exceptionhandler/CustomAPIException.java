package com.ecommerce.webstore_app.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CustomAPIException extends RuntimeException {
    public CustomAPIException(String message) {
        super(message);
    }
}
