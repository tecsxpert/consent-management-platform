package com.example.tool.controller;

import com.example.tool.security.JwtUtil;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Test
    void loginSuccess() {

        JwtUtil jwtUtil = mock(JwtUtil.class);

        when(jwtUtil.generateToken("admin"))
                .thenReturn("token123");

        AuthController controller =
                new AuthController(jwtUtil);

        Map<String, String> result =
                controller.login("admin", "123");

        assertNotNull(result);

        assertEquals(
                "token123",
                result.get("token")
        );

        verify(jwtUtil, times(1))
                .generateToken("admin");
    }

    @Test
    void loginFail() {

        JwtUtil jwtUtil = mock(JwtUtil.class);

        AuthController controller =
                new AuthController(jwtUtil);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> controller.login("wrong", "wrong")
                );

        assertEquals(
                "Invalid credentials",
                exception.getMessage()
        );

        verify(jwtUtil, never())
                .generateToken(anyString());
    }
}