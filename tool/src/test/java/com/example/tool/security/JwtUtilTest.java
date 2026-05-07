package com.example.tool.security;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private final JwtUtil jwtUtil =
            new JwtUtil();

    @Test
    void testGenerateToken() {

        String token =
                jwtUtil.generateToken("user");

        assertNotNull(token);

        assertFalse(token.isEmpty());
    }

    @Test
    void testValidateToken() {

        String token =
                jwtUtil.generateToken("user");

        boolean valid =
                jwtUtil.validateToken(token);

        assertTrue(valid);
    }

    @Test
    void testInvalidToken() {

        boolean valid =
                jwtUtil.validateToken("invalid.token");

        assertFalse(valid);
    }

    @Test
    void testExtractUsername() {

        String token =
                jwtUtil.generateToken("user");

        String username =
                jwtUtil.extractUsername(token);

        assertEquals("user", username);
    }

    @Test
    void testExtractUsernameFromInvalidToken() {

        assertThrows(
                Exception.class,
                () -> jwtUtil.extractUsername("bad.token")
        );
    }
}