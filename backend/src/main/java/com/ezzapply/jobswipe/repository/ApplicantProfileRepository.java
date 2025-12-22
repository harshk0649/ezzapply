package com.ezzapply.jobswipe.repository;

import com.ezzapply.jobswipe.model.ApplicantProfile;
import com.ezzapply.jobswipe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicantProfileRepository
        extends JpaRepository<ApplicantProfile, Long> {

    Optional<ApplicantProfile> findByUser(User user);
}
