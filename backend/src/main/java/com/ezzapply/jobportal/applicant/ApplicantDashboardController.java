package com.ezzapply.jobportal.applicant;

import com.ezzapply.jobportal.applicant.dto.ApplicantApplicationDTO;
import com.ezzapply.jobportal.application.ApplicationRepository;
import com.ezzapply.jobportal.application.JobApplication;
import com.ezzapply.jobportal.applicant.dto.ApplicantApplicationDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applicant/dashboard")
@CrossOrigin
public class ApplicantDashboardController {

    private final ApplicationRepository appRepo;

    public ApplicantDashboardController(ApplicationRepository appRepo) {
        this.appRepo = appRepo;
    }

    @GetMapping("/applications")
    public List<ApplicantApplicationDTO> getMyApplications(
            @AuthenticationPrincipal Long userId) {

        return appRepo.findByApplicantId(userId)
                .stream()
                .map(app -> new ApplicantApplicationDTO(
                        app.getId(),
                        app.getStatus().name(),
                        app.getJob().getId(),
                        app.getJob().getTitle(),
                        app.getJob().getLocation(),
                        app.getJob().getRecruiter().getFullName()
                ))
                .toList();
    }

}
