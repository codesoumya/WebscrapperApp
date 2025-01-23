package com.example.demo.service;

import com.example.demo.entity.WebsiteDetails;
import com.example.demo.model.ScrapedData;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WebsiteDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class WebScrapingService {

    @Autowired
    private WebsiteDetailsRepository websiteDetailsRepository;

    private final WebClient webClient;

    public WebScrapingService() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:8000") // Base URL of FastAPI
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer
                                .defaultCodecs()
                                .maxInMemorySize(48 * 1024 * 1024) // 16 MB limit
                        )
                        .build())
                .build(); // Base URL of FastAPI
    }

    public ScrapedData getScrapedData(String url) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/scrape")
                        .queryParam("url", url)
                        .build())
                .retrieve()
                .bodyToMono(ScrapedData.class)
                .block(); // Blocking call for simplicity
    }

    public List<WebsiteDetails> getWebsiteDetailsByUserId(String id){
        return websiteDetailsRepository.findByCreatedByUserId(id) ;
    }
}
