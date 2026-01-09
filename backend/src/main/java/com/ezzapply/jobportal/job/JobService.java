package com.ezzapply.jobportal.job;

import com.ezzapply.jobportal.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepo;

    public JobService(JobRepository jobRepo) {
        this.jobRepo = jobRepo;
    }

    // Recruiter creates a job
    public Job createJob(Job job, User recruiter) {
        job.setRecruiter(recruiter);
        return jobRepo.save(job);
    }

    // Recruiter sees own jobs
    public List<Job> getJobsByRecruiter(Long recruiterId) {
        return jobRepo.findByRecruiterId(recruiterId);
    }

    // Job seeker sees all jobs (for swipe)
    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    public Job getJob(Long jobId) {
        return jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }
}
