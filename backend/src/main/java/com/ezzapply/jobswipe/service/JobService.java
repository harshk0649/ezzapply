package com.ezzapply.jobswipe.service;

import com.ezzapply.jobswipe.model.Job;
import com.ezzapply.jobswipe.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    
    @Autowired
    private JobRepository jobRepository;
    
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }
    
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }
    
    public Job updateJob(Long id, Job jobDetails) {
        Job job = getJobById(id);
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setCompany(jobDetails.getCompany());
        job.setLocation(jobDetails.getLocation());
        job.setSalary(jobDetails.getSalary());
        job.setRequirements(jobDetails.getRequirements());
        return jobRepository.save(job);
    }
    
    public void deleteJob(Long id) {
        Job job = getJobById(id);
        jobRepository.delete(job);
    }
}