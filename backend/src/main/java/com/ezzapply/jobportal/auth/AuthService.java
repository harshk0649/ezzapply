package com.ezzapply.jobportal.auth;

import com.ezzapply.jobportal.security.JwtUtil;
import com.ezzapply.jobportal.user.User;
import com.ezzapply.jobportal.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;   // ✅ ADD THIS

    // ✅ UPDATE CONSTRUCTOR
    public AuthService(
            UserRepository userRepo,
            PasswordEncoder encoder,
            JwtUtil jwtUtil
    ) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    // ---------- REGISTER ----------
    public User register(RegisterRequest req) {
        User user = new User();
        user.setFullName(req.fullName);
        user.setEmail(req.email);
        user.setPassword(encoder.encode(req.password));
        user.setRole(req.role);
        return userRepo.save(user);
    }

    // ---------- LOGIN (JWT) ----------
    public String login(AuthRequest req) {

        User user = userRepo.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // ✅ RETURN JWT
        return jwtUtil.generateToken(
                user.getId(),
                user.getRole().name()
        );
    }
}
