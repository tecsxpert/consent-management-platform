package com.example.tool.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testUserGetterSetter() {

        User user = new User();

        user.setName("Manju");
        user.setEmail("test@gmail.com");
        user.setEmailSent(true);

        assertEquals("Manju", user.getName());
        assertEquals("test@gmail.com", user.getEmail());
        assertTrue(user.isEmailSent());
    }
}