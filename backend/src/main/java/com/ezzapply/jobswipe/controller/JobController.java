package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.model.job.Job;
import com.ezzapply.jobswipe.model.user.User;
import com.ezzapply.jobswipe.repository.UserRepository;
import com.ezzapply.jobswipe.service.JobService;
import com.ezzapply.jobswipe.security.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;
    private final UserRepository userRepository;

    public JobController(JobService jobService, UserRepository userRepository) {
        this.jobService = jobService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Job> createJob(
            @RequestBody Job job,
            Authentication authentication
    ) {
        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        User recruiter = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        job.setRecruiter(recruiter);

        return ResponseEntity.ok(jobService.createJob(job));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> getMyJobs(Authentication authentication) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        User recruiter = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                jobService.getJobsByRecruiter(recruiter)
        );
    }
    @PutMapping("/{id}/toggle")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Job> toggleJobStatus(
            @PathVariable Long id,
            Authentication authentication
    ) {
        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        User recruiter = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                jobService.toggleJobStatus(id, recruiter)
        );
    }


}
