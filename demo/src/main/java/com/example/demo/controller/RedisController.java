package com.example.demo.controller;

import com.example.demo.service.RedisService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/redis")
public class RedisController {

    private final RedisService redisService;

    public RedisController(RedisService redisService) {
        this.redisService = redisService;
    }

    // String endpoints
    @PostMapping("/string")
    public String setString(@RequestParam String key, @RequestParam String value) {
        redisService.setString(key, value);
        return "String saved successfully!";
    }

    @GetMapping("/string")
    public String getString(@RequestParam String key) {
        return redisService.getString(key);
    }

    // Hash endpoints
    @PostMapping("/hash")
    public String setHash(@RequestParam String key, @RequestBody Map<String, String> hash) {
        redisService.setHash(key, hash);
        return "Hash saved successfully!";
    }

    @GetMapping("/hash")
    public Map<Object, Object> getHash(@RequestParam String key) {
        return redisService.getHash(key);
    }

    // List endpoints
    @PostMapping("/list")
    public String addToList(@RequestParam String key, @RequestParam String value) {
        redisService.addToList(key, value);
        return "Value added to list!";
    }

    @GetMapping("/list")
    public List<Object> getList(@RequestParam String key) {
        return redisService.getList(key);
    }

    // Set endpoints
    @PostMapping("/set")
    public String addToSet(@RequestParam String key, @RequestParam String value) {
        redisService.addToSet(key, value);
        return "Value added to set!";
    }

    @GetMapping("/set")
    public Set<Object> getSet(@RequestParam String key) {
        return redisService.getSet(key);
    }
}
