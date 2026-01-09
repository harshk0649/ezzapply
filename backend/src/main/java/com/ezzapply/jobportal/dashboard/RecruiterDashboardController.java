package com.ezzapply.jobportal.dashboard;

import com.ezzapply.jobportal.application.*;
import com.ezzapply.jobportal.recruiter.dto.RecruiterApplicationDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter/dashboard")
@CrossOrigin
public class RecruiterDashboardController {

    private final ApplicationRepository appRepo;

    public RecruiterDashboardController(ApplicationRepository appRepo) {
        this.appRepo = appRepo;
    }

    // 1️⃣ View applicants for a job
    @GetMapping("/applications/{jobId}")
    public List<RecruiterApplicationDTO> getApplicationsForJob(
            @PathVariable Long jobId) {

        return appRepo.findByJobId(jobId)
                .stream()
                .map(app -> new RecruiterApplicationDTO(
                        app.getId(),
                        app.getStatus().name(),
                        app.getApplicant().getId(),
                        app.getApplicant().getFullName(),
                        app.getApplicant().getEmail(),
                        app.getJob().getId(),
                        app.getJob().getTitle()
                ))
                .toList();
    }


    // 2️⃣ Update application status
    @PatchMapping("/applications/{applicationId}/status")
    public JobApplication updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status) {

        JobApplication app = appRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(status);
        return appRepo.save(app);
    }
}
