package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.payload.request.LoginRequest;
import com.ezzapply.jobswipe.payload.request.SignupRequest;
import com.ezzapply.jobswipe.payload.response.JwtResponse;
import com.ezzapply.jobswipe.payload.response.MessageResponse;
import com.ezzapply.jobswipe.security.jwt.JwtUtils;
import com.ezzapply.jobswipe.security.services.UserDetailsImpl;
import com.ezzapply.jobswipe.service.ApplicantProfileService;
import com.ezzapply.jobswipe.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final ApplicantProfileService applicantProfileService;
    private final JwtUtils jwtUtils;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserService userService,
            ApplicantProfileService applicantProfileService,
            JwtUtils jwtUtils
    ) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.applicantProfileService = applicantProfileService;
        this.jwtUtils = jwtUtils;
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),   // EMAIL IS USERNAME
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(r -> r.getAuthority())
                .toList();

        return ResponseEntity.ok(
                new JwtResponse(
                        jwt,
                        userDetails.getId(),
                        userDetails.getUsername(), // this is email
                        roles
                )
        );
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {

        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Email already exists"));
        }

        var user = userService.createUser(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        // create profile only for applicants
        if ("applicant".equalsIgnoreCase(request.getRole())) {
            applicantProfileService.createEmptyProfile(user);
        }

        return ResponseEntity.ok(
                new MessageResponse("User registered successfully")
        );
    }
}
