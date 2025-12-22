package com.ezzapply.jobswipe.service;

import com.ezzapply.jobswipe.model.user.User;
import com.ezzapply.jobswipe.model.user.Role;
import com.ezzapply.jobswipe.model.user.ERole;
import com.ezzapply.jobswipe.repository.RoleRepository;
import com.ezzapply.jobswipe.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createUser(String name, String email, String password, String roleStr) {

        Role role = roleRepository.findByName(ERole.valueOf("ROLE_" + roleStr.toUpperCase()))
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of(role));

        return userRepository.save(user);
    }
}
