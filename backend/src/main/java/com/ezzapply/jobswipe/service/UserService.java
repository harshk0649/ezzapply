package com.ezzapply.jobswipe.service;

import com.ezzapply.jobswipe.model.ERole;
import com.ezzapply.jobswipe.model.Role;
import com.ezzapply.jobswipe.model.User;
import com.ezzapply.jobswipe.repository.RoleRepository;
import com.ezzapply.jobswipe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    @Transactional
    public User createUser(String name, String email, String password, String roleStr) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        
        Set<Role> roles = new HashSet<>();
        
        // Default role is ROLE_APPLICANT if not specified
        ERole userRole;
        if (roleStr == null || roleStr.isEmpty()) {
            userRole = ERole.ROLE_APPLICANT;
        } else {
            switch (roleStr.toLowerCase()) {
                case "admin":
                    userRole = ERole.ROLE_ADMIN;
                    break;
                case "recruiter":
                    userRole = ERole.ROLE_RECRUITER;
                    break;
                default:
                    userRole = ERole.ROLE_APPLICANT;
            }
        }
        
        Role role = roleRepository.findByName(userRole)
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
        roles.add(role);
        
        user.setRoles(roles);
        return userRepository.save(user);
    }
}


