package com.ezzapply.jobportal.job;

import com.ezzapply.jobportal.job.dto.JobListDTO;
import com.ezzapply.jobportal.user.User;
import com.ezzapply.jobportal.user.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    private final JobService jobService;
    private final UserRepository userRepo;

    public JobController(JobService jobService,
                         UserRepository userRepo) {
        this.jobService = jobService;
        this.userRepo = userRepo;
    }

    // ---------- CREATE JOB (JWT BASED) ----------
    @PostMapping("/recruiter/me")
    public Job createJob(
            @AuthenticationPrincipal Long userId,
            @RequestBody Job job) {

        User recruiter = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return jobService.createJob(job, recruiter);
    }

    // ---------- GET MY JOBS ----------
    @GetMapping("/recruiter/me")
    public List<Job> getMyJobs(
            @AuthenticationPrincipal Long userId) {

        return jobService.getJobsByRecruiter(userId);
    }

    // ---------- ALL JOBS (SWIPE PAGE) ----------
    @GetMapping
    public List<JobListDTO> getAllJobs() {
        return jobService.getAllJobs()
                .stream()
                .map(job -> new JobListDTO(
                        job.getId(),
                        job.getTitle(),
                        job.getLocation(),
                        job.getExperienceRequired(),
                        job.getRecruiter().getFullName()
                ))
                .toList();
    }


    // ---------- SINGLE JOB ----------
    @GetMapping("/{jobId}")
    public Job getJob(@PathVariable Long jobId) {
        return jobService.getJob(jobId);
    }
}
