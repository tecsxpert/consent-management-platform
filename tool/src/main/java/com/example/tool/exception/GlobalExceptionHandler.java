package com.example.tool.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

// ✅ Global Exception Handler
@ControllerAdvice
public class GlobalExceptionHandler {

    // ✅ 404 NOT FOUND
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse(
                ex.getMessage(),
                404,
                LocalDateTime.now()
        );
    }

    // ✅ 400 BAD REQUEST
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorResponse handleValidation(ValidationException ex) {
        return new ErrorResponse(
                ex.getMessage(),
                400,
                LocalDateTime.now()
        );
    }

    // ✅ 500 INTERNAL SERVER ERROR (IMPORTANT FIX)
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorResponse handleGeneric(Exception ex) {

        ex.printStackTrace();  // 🔥 SHOW REAL ERROR IN TERMINAL

        return new ErrorResponse(
                ex.getMessage(),   // 👈 SHOW REAL ERROR IN POSTMAN
                500,
                LocalDateTime.now()
        );
    }
}