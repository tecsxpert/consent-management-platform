package com.example.tool.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler =
            new GlobalExceptionHandler();

    @Test
    void testHandleNotFound() {

        ErrorResponse response =
                handler.handleNotFound(
                        new ResourceNotFoundException("Not found")
                );

        assertEquals(404, response.getStatus());
    }

    @Test
    void testHandleValidation() {

        ErrorResponse response =
                handler.handleValidation(
                        new ValidationException("Invalid")
                );

        assertEquals(400, response.getStatus());
    }

    @Test
    void testHandleGeneric() {

        ErrorResponse response =
                handler.handleGeneric(
                        new RuntimeException("Error")
                );

        assertEquals(500, response.getStatus());
    }
}