package com.ezzapply.jobswipe.repository;

import com.ezzapply.jobswipe.model.swipe.Swipe;
import com.ezzapply.jobswipe.model.user.User;
import com.ezzapply.jobswipe.model.job.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SwipeRepository extends JpaRepository<Swipe, Long> {

    Optional<Swipe> findByUserAndJob(User user, Job job);

    boolean existsByUserAndJob(User user, Job job);
}
