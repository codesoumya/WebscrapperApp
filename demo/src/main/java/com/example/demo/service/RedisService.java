package com.example.demo.service;

import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.List;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // String operations
    public void setString(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public String getString(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    // Hash operations
    public void setHash(String key, Map<String, String> hash) {
        redisTemplate.opsForHash().putAll(key, hash);
    }

    public Map<Object, Object> getHash(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    // List operations
    public void addToList(String key, String value) {
        redisTemplate.opsForList().rightPush(key, value);
    }

    public List<Object> getList(String key) {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    // Set operations
    public void addToSet(String key, String value) {
        redisTemplate.opsForSet().add(key, value);
    }

    public Set<Object> getSet(String key) {
        return redisTemplate.opsForSet().members(key);
    }
}
