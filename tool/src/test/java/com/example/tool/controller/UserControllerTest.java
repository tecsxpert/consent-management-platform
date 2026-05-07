package com.example.tool.controller;

import com.example.tool.entity.User;
import com.example.tool.service.UserService;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Test
    void createUserTest() {

        UserService service = mock(UserService.class);

        User user = new User();
        user.setName("Manju");

        when(service.save(user)).thenReturn(user);

        UserController controller =
                new UserController(service);

        User result = controller.createUser(user);

        assertEquals("Manju", result.getName());
    }

    @Test
    void getAllUsersTest() {

        UserService service = mock(UserService.class);

        when(service.getAll())
                .thenReturn(List.of(new User()));

        UserController controller =
                new UserController(service);

        assertEquals(1,
                controller.getAllUsers().size());
    }
}