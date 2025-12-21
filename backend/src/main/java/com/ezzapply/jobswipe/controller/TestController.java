package com.ezzapply.jobswipe.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/ping")
    public Map<String, String> ping() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Backend is working!");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return response;
    }
    
    @GetMapping("/auth-status")
    public Map<String, String> authStatus() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Public endpoint is accessible!");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return response;
    }
}

