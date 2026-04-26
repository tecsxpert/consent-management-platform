package com.example.tool.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Cacheable("users")
    public String getUser(Long id) {
        System.out.println("DB CALL...");
        return "User " + id;
    }

    @CacheEvict(value = "users", allEntries = true)
    public void clearCache() {
        System.out.println("CACHE CLEARED");
    }
}