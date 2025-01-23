package com.example.demo.model;

import com.google.gson.Gson;

public class SummarizeDetails {
    private String details;
    private String quickSummary;
    private String displayName;

    // Getter and Setter methods
    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.details = displayName;
    }

    public String getQuickSummary() {
        return quickSummary;
    }

    public void setQuickSummary(String quickSummary) {
        this.quickSummary = quickSummary;
    }

    // Method to parse JSON string and return SummarizeDetails object
    public static SummarizeDetails fromJson(String jsonString) {
        Gson gson = new Gson();
        return gson.fromJson(jsonString, SummarizeDetails.class);
    }
}
