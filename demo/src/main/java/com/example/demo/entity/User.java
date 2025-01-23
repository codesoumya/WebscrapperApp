package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_table")
public class User {

    @Id
    private String id;

    private String name;
    private String phoneNumber;

    @Column(unique = true)
    private String emailId;
    private String password;

    // Default constructor
    public User() {}

    // Constructor
    public User(String id, String name, String phoneNumber,String emailId, String password) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.emailId = emailId;
        this.password = password;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
