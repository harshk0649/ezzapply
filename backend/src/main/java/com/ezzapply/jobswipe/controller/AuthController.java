package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.model.User;
import com.ezzapply.jobswipe.payload.request.LoginRequest;
import com.ezzapply.jobswipe.payload.request.SignupRequest;
import com.ezzapply.jobswipe.payload.response.JwtResponse;
import com.ezzapply.jobswipe.payload.response.MessageResponse;
import com.ezzapply.jobswipe.security.jwt.JwtUtils;
import com.ezzapply.jobswipe.security.services.UserDetailsImpl;
import com.ezzapply.jobswipe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());
    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for email: " + loginRequest.getEmail());
        
        try {
            // Log the authentication attempt
            logger.info("Attempting authentication with AuthenticationManager");
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            logger.info("Authentication successful, setting security context");
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            logger.info("Generating JWT token");
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            
            logger.info("Login successful for user: " + userDetails.getEmail() + " with roles: " + 
                        userDetails.getAuthorities().stream()
                            .map(auth -> auth.getAuthority())
                            .collect(Collectors.joining(", ")));

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getName(),
                    userDetails.getEmail(),
                    userDetails.getAuthorities()));
        } catch (Exception e) {
            logger.severe("Login failed: " + e.getMessage());
            e.printStackTrace(); // Add stack trace for debugging
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Invalid email or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        logger.info("Registration attempt for email: " + signUpRequest.getEmail());
        
        try {
            if (userService.existsByEmail(signUpRequest.getEmail())) {
                logger.info("Registration failed: Email already in use");
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Email is already in use!"));
            }

            User user = userService.createUser(
                    signUpRequest.getName(),
                    signUpRequest.getEmail(),
                    signUpRequest.getPassword(),
                    signUpRequest.getRole());
            
            logger.info("Registration successful for user: " + user.getEmail());

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            logger.severe("Registration failed: " + e.getMessage());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}








