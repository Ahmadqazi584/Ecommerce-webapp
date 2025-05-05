package com.ecommerce.webstore_app.exceptionhandler;

import jakarta.persistence.ElementCollection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandlerWebStore {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgsNotValidExceptions(MethodArgumentNotValidException ex) {
        HashMap<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError)error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<APIResponse> customValidationExceptionHandler(CustomValidationException ex) {
        APIResponse apiResponse = new APIResponse(ex.getMessage(), false, LocalDateTime.now());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomAPIException.class)
    public ResponseEntity<APIResponse> customAPIExceptionHandler(CustomAPIException ex) {
        APIResponse apiResponse = new APIResponse(ex.getMessage(), false, LocalDateTime.now());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }
}
