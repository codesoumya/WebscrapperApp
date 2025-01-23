package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.WebsiteDetails;
import com.example.demo.service.UserValidationService;
import com.example.demo.service.WebScrapingService;
import com.example.demo.service.WebsiteDetailsService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class GenralDataServiceController {

    @Autowired
    private WebScrapingService webScrapingService;

    @Autowired
    private UserValidationService userValidationService;

    @Autowired
    private WebsiteDetailsService websiteDetailsService;

    @GetMapping("/getAllSiteDetails")
    public String getAllSiteDetails(
            @RequestParam String email,
            @RequestParam String password
    ) {
        User user = userValidationService.validateEmailAndPassword(email, password);
        Map<String, Object> wrapper = new HashMap<>();
        wrapper.put("details", webScrapingService.getWebsiteDetailsByUserId(user.getId()));
        Gson gson = new Gson();
        return gson.toJson(wrapper);
    }

    @DeleteMapping("/deleteSite")
    public void deleteSite(
            @RequestParam String id
    ){
        websiteDetailsService.deleteWebsiteDetails(id);
    }

    @PostMapping("/updateSiteDetails")
    public void updateWebsite(
            @RequestBody WebsiteDetails wd
    ){
        websiteDetailsService.updateWebsiteDetails(wd.getId(), wd);
    }

}
