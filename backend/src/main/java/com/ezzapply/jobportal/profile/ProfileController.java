package com.ezzapply.jobportal.profile;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // JOB SEEKER PROFILE
    @PostMapping("/job-seeker/{userId}")
    public JobSeekerProfile saveJobSeekerProfile(
            @PathVariable Long userId,
            @RequestBody JobSeekerProfile profile) {
        return profileService.saveJobSeekerProfile(userId, profile);
    }

    // RECRUITER PROFILE
    @PostMapping("/recruiter/{userId}")
    public RecruiterProfile saveRecruiterProfile(
            @PathVariable Long userId,
            @RequestBody RecruiterProfile profile) {
        return profileService.saveRecruiterProfile(userId, profile);
    }
}
