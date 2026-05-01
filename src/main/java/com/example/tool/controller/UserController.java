package com.example.tool.controller;

import com.example.tool.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id) {
        return service.getUser(id);
    }

    @DeleteMapping("/clear")
    public String clear() {
        service.clearCache();
        return "Cache cleared";
    }
}