package com.ezzapply.jobportal.config;

import com.ezzapply.jobportal.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    // ✅ ADD THIS BEAN (THIS FIXES YOUR ERROR)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

            // PUBLIC
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()

            // APPLICANT
            .requestMatchers("/api/applicant/**")
                .hasAuthority("ROLE_JOB_SEEKER")

            // RECRUITER
            .requestMatchers("/api/jobs/recruiter/**")
                .hasAuthority("ROLE_RECRUITER")
            .requestMatchers("/api/recruiter/**")
                .hasAuthority("ROLE_RECRUITER")

            .anyRequest().authenticated()
        )



            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
