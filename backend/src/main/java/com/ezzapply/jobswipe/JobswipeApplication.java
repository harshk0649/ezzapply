package com.ezzapply.jobswipe;

import com.ezzapply.jobswipe.model.ERole;
import com.ezzapply.jobswipe.model.Role;
import com.ezzapply.jobswipe.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JobswipeApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobswipeApplication.class, args);
    }

    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            // Initialize roles if they don't exist
            if (roleRepository.count() == 0) {
                roleRepository.save(new Role(ERole.ROLE_APPLICANT));
                roleRepository.save(new Role(ERole.ROLE_RECRUITER));
                roleRepository.save(new Role(ERole.ROLE_ADMIN));
            }
        };
    }
}
