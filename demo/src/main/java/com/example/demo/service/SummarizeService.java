package com.example.demo.service;

import com.example.demo.model.ScrapedData;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class SummarizeService {

    private final WebClient webClient;

    public SummarizeService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:5000").build();
    }

    public String summarizeScrapedData(String scrapedData) {
        return this.webClient.post()
                .uri("/summarize-scrape-data")
                .bodyValue(scrapedData)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
