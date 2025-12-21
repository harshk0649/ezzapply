package com.ezzapply.jobswipe.controller;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ezzapply.jobswipe.model.SwipeDirection;
import com.ezzapply.jobswipe.security.services.UserDetailsImpl;
import com.ezzapply.jobswipe.service.SwipeService;

@RestController
@RequestMapping("/api/swipe")
@CrossOrigin(origins = "*")
public class SwipeController {

    private final SwipeService swipeService;

    public SwipeController(SwipeService swipeService) {
        this.swipeService = swipeService;
    }

    @PostMapping("/right/{jobId}")
    public Map<String, String> swipeRight(
        @PathVariable Long jobId,
        @AuthenticationPrincipal UserDetailsImpl user
    ) {
        return Map.of("message",
            swipeService.swipe(user.getId(), jobId, SwipeDirection.RIGHT)
        );
    }

    @PostMapping("/left/{jobId}")
    public Map<String, String> swipeLeft(
        @PathVariable Long jobId,
        @AuthenticationPrincipal UserDetailsImpl user
    ) {
        return Map.of("message",
            swipeService.swipe(user.getId(), jobId, SwipeDirection.LEFT)
        );
    }
}
