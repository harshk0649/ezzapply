package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.model.application.ApplicantProfile;
import com.ezzapply.jobswipe.model.user.User;
import com.ezzapply.jobswipe.repository.UserRepository;
import com.ezzapply.jobswipe.security.services.UserDetailsImpl;
import com.ezzapply.jobswipe.service.ApplicantProfileService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('APPLICANT')")
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

    // ✅ GET MY PROFILE
    @GetMapping("/me")
    public ApplicantProfile getMyProfile(Authentication authentication) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileService.getProfile(user);
    }

    // ✅ UPDATE MY PROFILE
    @PutMapping("/me")
    public ApplicantProfile updateMyProfile(
            Authentication authentication,
            @RequestBody ApplicantProfile updated
    ) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
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

        // 🔥 profile completion logic (simple)
        profile.setProfileCompletion(70);

        return profileService.save(profile);
    }
}
