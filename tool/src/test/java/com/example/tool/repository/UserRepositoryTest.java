package com.example.tool.repository;

import com.example.tool.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")   // 🔥 IMPORTANT
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveAndFindUser() {
        User user = new User();
        user.setName("Test User");
        user.setEmail("test@mail.com");
        user.setEmailSent(false);

        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
        assertEquals("test@mail.com", savedUser.getEmail());
    }
}