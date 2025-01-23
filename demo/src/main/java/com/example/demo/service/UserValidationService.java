package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserValidationService {

    @Autowired
    private UserRepository userRepository;  // Assuming you have UserRepository interface to interact with DB

    /**
     * Validate if the email is already in use.
     *
     * @param email The email to check
     * @throws IllegalArgumentException if the email exists
     */
    public void validateEmailNotExist(String email) {
        Optional<User> existingUser = userRepository.findByEmailId(email);
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
    }

    /**
     * Validate if the email and password are correct.
     *
     * @param email    The email to check
     * @param password The password to verify
     * @return User if the credentials are valid
     * @throws IllegalArgumentException if the email or password are invalid
     */
    public User validateEmailAndPassword(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmailId(email);

        if (existingUser.isEmpty()) {
            throw new IllegalArgumentException("Email not found.");
        }

        User user = existingUser.get();
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password.");
        }

        return user;  // Return user details if the email and password match
    }
}
