package com.ezzapply.jobswipe.service;

import com.ezzapply.jobswipe.model.*;
import com.ezzapply.jobswipe.repository.JobRepository;
import com.ezzapply.jobswipe.repository.SwipeRepository;
import com.ezzapply.jobswipe.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class SwipeService {

    private final SwipeRepository swipeRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public SwipeService(
            SwipeRepository swipeRepository,
            UserRepository userRepository,
            JobRepository jobRepository
    ) {
        this.swipeRepository = swipeRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public String swipe(Long userId, Long jobId, SwipeDirection direction) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (swipeRepository.existsByUserAndJob(user, job)) {
            return "You already swiped this job";
        }

        Swipe swipe = new Swipe();
        swipe.setUser(user);
        swipe.setJob(job);
        swipe.setDirection(direction);

        swipeRepository.save(swipe);

        return direction == SwipeDirection.RIGHT
                ? "Job applied successfully"
                : "Job skipped";
    }
}
