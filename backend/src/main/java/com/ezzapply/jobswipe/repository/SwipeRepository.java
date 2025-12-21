package com.ezzapply.jobswipe.repository;

import com.ezzapply.jobswipe.model.Swipe;
import com.ezzapply.jobswipe.model.User;
import com.ezzapply.jobswipe.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SwipeRepository extends JpaRepository<Swipe, Long> {

    Optional<Swipe> findByUserAndJob(User user, Job job);

    boolean existsByUserAndJob(User user, Job job);
}
