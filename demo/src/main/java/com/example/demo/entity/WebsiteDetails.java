package com.example.demo.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "website_details")
public class WebsiteDetails {

    @Id
    private String id;

    @Column(columnDefinition = "TEXT")
    private String webUrl;

    @Column(columnDefinition = "TEXT")
    private String contentDetails;

    @Column(columnDefinition = "TEXT")
    private String summarizeMarkdown;

    @Column(columnDefinition = "TEXT")
    private String websiteDetails;

    @Column(columnDefinition = "TEXT")
    private String createdByUserId;

    @Column(columnDefinition = "TEXT")
    private  String displayName;

    @Column(columnDefinition = "NUMERIC")
    private BigDecimal createdOn;

    @Column(columnDefinition = "NUMERIC")
    private BigDecimal updatedOn;

    // Default constructor
    public WebsiteDetails() {}

    // Constructor
    public WebsiteDetails(String id,
                          String url,
                          String contentDetails,
                          String summarizeMarkdown,
                          String websiteDetails,
                          String createdByUserId,
                          String displayName,
                          BigDecimal createdOn,
                          BigDecimal updatedOn) {
        this.id = id;
        this.webUrl = url;
        this.contentDetails = contentDetails;
        this.summarizeMarkdown = summarizeMarkdown;
        this.websiteDetails = websiteDetails;
        this.createdByUserId = createdByUserId;
        this.displayName = displayName;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWebUrl() {
        return webUrl;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }

    public String getContentDetails() {
        return contentDetails;
    }

    public void setContentDetails(String contentDetails) {
        this.contentDetails = contentDetails;
    }

    public String getSummarizeMarkdown() {
        return summarizeMarkdown;
    }

    public void setSummarizeMarkdown(String summarizeMarkdown) {
        this.summarizeMarkdown = summarizeMarkdown;
    }

    public String getWebsiteDetails() {
        return websiteDetails;
    }

    public void setWebsiteDetails(String websiteDetails) {
        this.websiteDetails = websiteDetails;
    }

    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public BigDecimal getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(BigDecimal createdOn) {
        this.createdOn = createdOn;
    }

    public BigDecimal getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(BigDecimal updatedOn) {
        this.updatedOn = updatedOn;
    }
}
