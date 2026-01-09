package com.ezzapply.jobportal.auth;

import com.ezzapply.jobportal.user.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ---------- REGISTER ----------
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AuthRequest req) {
        String token = authService.login(req);
        return Map.of("token", token);
    }
}
