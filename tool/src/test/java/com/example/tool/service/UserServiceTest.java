package com.example.tool.service;

import com.example.tool.entity.User;
import com.example.tool.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository repository;

    private UserService userService;

    @BeforeEach
    void setup() {
        repository = mock(UserRepository.class);
        userService = new UserService(repository);
    }

    @Test
    void testSave() {

        User user = new User();
        user.setName("Manju");

        when(repository.save(user)).thenReturn(user);

        User saved = userService.save(user);

        assertEquals("Manju", saved.getName());
    }

    @Test
    void testGetAll() {

        when(repository.findAll()).thenReturn(List.of(new User()));

        List<User> users = userService.getAll();

        assertEquals(1, users.size());
    }

    @Test
    void testGetById() {

        User user = new User();
        user.setName("Test");

        when(repository.findById(1L))
                .thenReturn(Optional.of(user));

        User result = userService.getById(1L);

        assertEquals("Test", result.getName());
    }

    @Test
    void testDelete() {

        userService.delete(1L);

        verify(repository, times(1))
                .deleteById(1L);
    }
}