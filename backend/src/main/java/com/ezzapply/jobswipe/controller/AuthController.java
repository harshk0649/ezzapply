package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.payload.request.LoginRequest;
import com.ezzapply.jobswipe.payload.request.SignupRequest;
import com.ezzapply.jobswipe.payload.response.MessageResponse;
import com.ezzapply.jobswipe.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserService userService
    ) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        return ResponseEntity.ok(new MessageResponse("Login successful"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {

        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Email already exists"));
        }

        userService.createUser(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }
}