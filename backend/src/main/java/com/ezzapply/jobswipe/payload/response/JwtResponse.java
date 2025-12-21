package com.ezzapply.jobswipe.payload.response;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;

    public JwtResponse(String token, Long id, String name, String email, 
                      Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        
        // Extract role from authorities
        this.role = authorities.stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_APPLICANT")
                .replace("ROLE_", "")
                .toLowerCase();
    }

    // Getters
    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
}

