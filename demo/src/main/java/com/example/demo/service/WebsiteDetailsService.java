package com.example.demo.service;

import com.example.demo.entity.WebsiteDetails;
import com.example.demo.repository.WebsiteDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WebsiteDetailsService {

    @Autowired
    private WebsiteDetailsRepository websiteDetailsRepository;

    public WebsiteDetails saveWebsiteDetails(WebsiteDetails websiteDetails) {
        // Check if ID is null and throw an exception
        if (websiteDetails.getId() == null || websiteDetails.getId().isEmpty()) {
            throw new IllegalArgumentException("ID cannot be null or empty when saving WebsiteDetails");
        }
        return websiteDetailsRepository.save(websiteDetails);
    }

    public List<WebsiteDetails> getAllWebsiteDetails() {
        return websiteDetailsRepository.findAll();
    }

    public Optional<WebsiteDetails> getWebsiteDetailsById(String id) {
        return websiteDetailsRepository.findById(id);
    }

    public void deleteWebsiteDetails(String id) {
        websiteDetailsRepository.deleteById(id);
    }

    public WebsiteDetails updateWebsiteDetails(String id, WebsiteDetails updatedWebsiteDetails) {
        // Check if ID is provided in the request
        if (updatedWebsiteDetails.getId() == null || updatedWebsiteDetails.getId().isEmpty()) {
            throw new IllegalArgumentException("ID cannot be null or empty when updating WebsiteDetails");
        }

        // Perform the update operation
        WebsiteDetails existingWebsiteDetails = websiteDetailsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("WebsiteDetails not found for ID: " + id));

        // Update fields only if they are not null
        if (updatedWebsiteDetails.getWebUrl() != null) {
            existingWebsiteDetails.setWebUrl(updatedWebsiteDetails.getWebUrl());
        }
        if (updatedWebsiteDetails.getContentDetails() != null) {
            existingWebsiteDetails.setContentDetails(updatedWebsiteDetails.getContentDetails());
        }
        if (updatedWebsiteDetails.getSummarizeMarkdown() != null) {
            existingWebsiteDetails.setSummarizeMarkdown(updatedWebsiteDetails.getSummarizeMarkdown());
        }
        if (updatedWebsiteDetails.getWebsiteDetails() != null) {
            existingWebsiteDetails.setWebsiteDetails(updatedWebsiteDetails.getWebsiteDetails());
        }
        if (updatedWebsiteDetails.getDisplayName() != null) {
            existingWebsiteDetails.setDisplayName(updatedWebsiteDetails.getDisplayName());
        }
        if (updatedWebsiteDetails.getCreatedOn() != null) {
            existingWebsiteDetails.setCreatedOn(updatedWebsiteDetails.getCreatedOn());
        }
        if (updatedWebsiteDetails.getUpdatedOn() != null) {
            existingWebsiteDetails.setUpdatedOn(updatedWebsiteDetails.getUpdatedOn());
        }

        return websiteDetailsRepository.save(existingWebsiteDetails);
    }
}
