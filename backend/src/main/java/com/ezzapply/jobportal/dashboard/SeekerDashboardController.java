package com.ezzapply.jobportal.dashboard;

import com.ezzapply.jobportal.application.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/seeker/dashboard")
@CrossOrigin
public class SeekerDashboardController {

    private final ApplicationRepository appRepo;

    public SeekerDashboardController(ApplicationRepository appRepo) {
        this.appRepo = appRepo;
    }

    @GetMapping("/applications")
    public List<SeekerApplicationDto> getMyApplications(
            @AuthenticationPrincipal Long userId
    ) {
        List<JobApplication> applications =
                appRepo.findByApplicantId(userId);

        return applications.stream().map(app -> {
            SeekerApplicationDto dto = new SeekerApplicationDto();
            dto.setApplicationId(app.getId());
            dto.setStatus(app.getStatus());
            dto.setJobId(app.getJob().getId());
            dto.setJobTitle(app.getJob().getTitle());
            dto.setJobLocation(app.getJob().getLocation());
            return dto;
        }).collect(Collectors.toList());
    }
}
