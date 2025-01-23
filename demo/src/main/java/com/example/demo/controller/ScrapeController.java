package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.WebsiteDetails;
import com.example.demo.model.ScrapedData;
import com.example.demo.model.SummarizeDetails;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/scrape")
public class ScrapeController {

    @Autowired
    private UserService userService;

    @Autowired
    private WebScrapingService webScrapingService;

    @Autowired
    private WebsiteDetailsService websiteDetailsService;

    @Autowired
    private SummarizeService summarizeService;

    @Autowired
    private UserValidationService userValidationService;

    @PostMapping
    public WebsiteDetails scrapeWebsite(
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String webUrl
    ) {
        User user = userValidationService.validateEmailAndPassword(email, password);
        String id = UUID.randomUUID().toString();
        WebsiteDetails wd = new WebsiteDetails(id, webUrl, null, null, null, user.getId(), null, null, null);
        websiteDetailsService.saveWebsiteDetails(wd);
        ScrapedData scrapedData = webScrapingService.getScrapedData(webUrl);
        String stringFyScrapedData = scrapedData.formString();
        wd.setContentDetails(stringFyScrapedData);
        websiteDetailsService.updateWebsiteDetails(id,wd);
        String res = summarizeService.summarizeScrapedData(stringFyScrapedData);
        SummarizeDetails summarizeDetails = SummarizeDetails.fromJson(res);
        wd.setSummarizeMarkdown(summarizeDetails.getDetails());
        wd.setWebsiteDetails(summarizeDetails.getQuickSummary());
        wd.setDisplayName(summarizeDetails.getDisplayName());
        wd.setCreatedOn(BigDecimal.valueOf(System.currentTimeMillis()));
        wd.setUpdatedOn(BigDecimal.valueOf(System.currentTimeMillis()));
        return websiteDetailsService.updateWebsiteDetails(id, wd);
    }
}
