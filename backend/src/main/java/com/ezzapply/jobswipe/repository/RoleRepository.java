package com.ezzapply.jobswipe.repository;

import com.ezzapply.jobswipe.model.ERole;
import com.ezzapply.jobswipe.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
