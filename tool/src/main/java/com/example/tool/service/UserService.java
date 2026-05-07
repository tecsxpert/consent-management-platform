package com.example.tool.service;

import com.example.tool.entity.User;
import com.example.tool.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Constructor Injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ Save / Register User
    public User save(User user) {
        return userRepository.save(user);
    }

    // ✅ Get All Users
    public List<User> getAll() {
        return userRepository.findAll();
    }

    // ✅ Get User By ID
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // ✅ Delete User (optional but good practice)
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}