package com.example.demo.repository;

import com.example.demo.entity.WebsiteDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WebsiteDetailsRepository extends JpaRepository<WebsiteDetails, String> {
    // You can define custom query methods if needed
    @Query("SELECT w FROM WebsiteDetails w WHERE w.createdByUserId = :userId")
    List<WebsiteDetails> findByCreatedByUserId(String userId);
}
