package com.ezzapply.jobswipe.repository;

import com.ezzapply.jobswipe.model.application.ApplicantProfile;
import com.ezzapply.jobswipe.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicantProfileRepository
        extends JpaRepository<ApplicantProfile, Long> {

    Optional<ApplicantProfile> findByUser(User user);
}
