package com.example.tool.service;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public String generateToken(String email) {
        // simple dummy token for now
        return "dummy-token-for-" + email;
    }
}