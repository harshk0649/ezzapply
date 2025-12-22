package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.model.User;
import com.ezzapply.jobswipe.payload.request.LoginRequest;
import com.ezzapply.jobswipe.payload.request.SignupRequest;
import com.ezzapply.jobswipe.payload.response.MessageResponse;
import com.ezzapply.jobswipe.service.ApplicantProfileService;
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
    private final ApplicantProfileService applicantProfileService;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserService userService,
            ApplicantProfileService applicantProfileService
    ) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.applicantProfileService = applicantProfileService;
    }

    // ===== LOGIN =====
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

    // ===== REGISTER =====
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {

        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Email already exists"));
        }

        User user = userService.createUser(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        // ✅ CREATE PROFILE ONLY FOR APPLICANT
        if ("applicant".equalsIgnoreCase(request.getRole())) {
            applicantProfileService.createEmptyProfile(user);
        }

        return ResponseEntity.ok(
                new MessageResponse("User registered successfully")
        );
    }
}