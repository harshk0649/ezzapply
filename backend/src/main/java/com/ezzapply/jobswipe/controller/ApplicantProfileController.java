package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.model.application.ApplicantProfile;
import com.ezzapply.jobswipe.model.user.User;
import com.ezzapply.jobswipe.repository.UserRepository;
import com.ezzapply.jobswipe.service.ApplicantProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ApplicantProfileController {

    private final ApplicantProfileService profileService;
    private final UserRepository userRepository;

    public ApplicantProfileController(
            ApplicantProfileService profileService,
            UserRepository userRepository
    ) {
        this.profileService = profileService;
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public ApplicantProfile getProfile(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileService.getProfile(user);
    }

    @PutMapping("/{userId}")
    public ApplicantProfile updateProfile(
            @PathVariable Long userId,
            @RequestBody ApplicantProfile updated
    ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ApplicantProfile profile = profileService.getProfile(user);

        // ===== BASIC INFO =====
        profile.setHeadline(updated.getHeadline());
        profile.setSummary(updated.getSummary());
        profile.setLocation(updated.getLocation());
        profile.setOpenToWork(updated.getOpenToWork());

        // ===== SKILLS & EXPERIENCE =====
        profile.setSkills(updated.getSkills());
        profile.setCurrentRole(updated.getCurrentRole());
        profile.setExperienceYears(updated.getExperienceYears());
        profile.setExperienceDetails(updated.getExperienceDetails());

        // ===== EDUCATION =====
        profile.setHighestEducation(updated.getHighestEducation());
        profile.setEducationDetails(updated.getEducationDetails());

        // ===== LINKS =====
        profile.setResumeUrl(updated.getResumeUrl());
        profile.setPortfolioUrl(updated.getPortfolioUrl());
        profile.setLinkedinUrl(updated.getLinkedinUrl());
        profile.setGithubUrl(updated.getGithubUrl());

        // ===== PREFERENCES =====
        profile.setPreferredJobType(updated.getPreferredJobType());
        profile.setPreferredLocation(updated.getPreferredLocation());
        profile.setExpectedSalaryMin(updated.getExpectedSalaryMin());
        profile.setExpectedSalaryMax(updated.getExpectedSalaryMax());
        profile.setRemotePreferred(updated.getRemotePreferred());

        // ===== TEMP PROFILE COMPLETION (we'll automate later) =====
        profile.setProfileCompletion(70);

        return profileService.save(profile);
    }


}
