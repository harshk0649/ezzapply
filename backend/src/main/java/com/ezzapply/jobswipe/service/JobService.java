package com.ezzapply.jobswipe.service;

import com.ezzapply.jobswipe.model.job.Job;
import com.ezzapply.jobswipe.repository.JobRepository;
import org.springframework.stereotype.Service;
import com.ezzapply.jobswipe.model.user.User;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // ================= GET ALL JOBS =================
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // ================= GET JOB BY ID =================
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found with id: " + id));
    }

    // ================= CREATE JOB =================
    public Job createJob(Job job) {
        job.setActive(true);
        return jobRepository.save(job);
    }

    // ================= UPDATE JOB =================
    public Job updateJob(Long id, Job jobDetails) {

        Job job = getJobById(id);

        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setRequirements(jobDetails.getRequirements());
        job.setLocation(jobDetails.getLocation());
        job.setJobType(jobDetails.getJobType());
        job.setExperienceYears(jobDetails.getExperienceYears());
        job.setSalaryMin(jobDetails.getSalaryMin());
        job.setSalaryMax(jobDetails.getSalaryMax());
        return jobRepository.save(job);
    }

    // ================= DELETE JOB =================
    public void deleteJob(Long id) {
        Job job = getJobById(id);
        jobRepository.delete(job);
    }


public List<Job> getJobsByRecruiter(User recruiter) {
    return jobRepository.findByRecruiter(recruiter);
    }
        public Job toggleJobStatus(Long jobId, User recruiter) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // 🔐 security: only owner can toggle
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Not authorized to update this job");
        }

        job.setActive(!job.getActive());
        return jobRepository.save(job);
    }

    public List<Job> getSwipeJobs(User user) {
        return jobRepository.findAll(); // temporary
    }

}
