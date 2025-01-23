package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.gson.Gson;

import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)  // Exclude null fields during JSON serialization
public class ScrapedData {

    private String url;  // Added url field
    private Map<String, List<String>> headers;
    private List<String> links;
    private List<String> paragraphs;
    private List<List<String>> orderedLists;
    private Map<String, List<String>> otherTags;

    // Getters and Setters
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Map<String, List<String>> getHeaders() {
        return headers;
    }

    public void setHeaders(Map<String, List<String>> headers) {
        this.headers = headers;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public List<String> getParagraphs() {
        return paragraphs;
    }

    public void setParagraphs(List<String> paragraphs) {
        this.paragraphs = paragraphs;
    }

    public List<List<String>> getOrderedLists() {
        return orderedLists;
    }

    public void setOrderedLists(List<List<String>> orderedLists) {
        this.orderedLists = orderedLists;
    }

    public Map<String, List<String>> getOtherTags() {
        return otherTags;
    }

    public void setOtherTags(Map<String, List<String>> otherTags) {
        this.otherTags = otherTags;
    }

    // Convert object to JSON string using Gson
    public String formString() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    // Optionally, you could also add a method to serialize using Jackson if you're using it for deserialization.
    /*
    public String toJsonUsingJackson() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(this);
    }
    */
}
