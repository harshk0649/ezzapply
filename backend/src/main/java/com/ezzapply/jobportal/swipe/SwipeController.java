package com.ezzapply.jobportal.swipe;

import com.ezzapply.jobportal.application.JobApplication;
import com.ezzapply.jobportal.job.Job;
import com.ezzapply.jobportal.user.User;
import com.ezzapply.jobportal.user.UserRepository;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/swipe")
@CrossOrigin
public class SwipeController {

    private final SwipeService swipeService;
    private final UserRepository userRepo;

    public SwipeController(
            SwipeService swipeService,
            UserRepository userRepo
    ) {
        this.swipeService = swipeService;
        this.userRepo = userRepo;
    }

    // ✅ APPLY TO JOB (RIGHT SWIPE)
    @PostMapping("/apply/{jobId}")
    public JobApplication swipeApply(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long jobId
    ) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return swipeService.swipeApply(user, jobId);
    }

    // ✅ GET REMAINING DAILY CREDITS
    @GetMapping("/credits")
    public int getRemainingCredits(
            @AuthenticationPrincipal Long userId
    ) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return swipeService.getRemainingCredits(user);
    }

    // ✅ GET SWIPEABLE JOBS (NO APPLIED JOBS)
        @GetMapping("/jobs")
        public List<Job> getSwipeJobs(
                @AuthenticationPrincipal Long userId
        ) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return swipeService.getSwipeJobs(user);
        }

}
