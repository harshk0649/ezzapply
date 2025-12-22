package com.ezzapply.jobswipe.controller;

import com.ezzapply.jobswipe.model.ApplicantProfile;
import com.ezzapply.jobswipe.model.User;
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

        profile.setHeadline(updated.getHeadline());
        profile.setSummary(updated.getSummary());
        profile.setSkills(updated.getSkills());
        profile.setEducation(updated.getEducation());
        profile.setExperience(updated.getExperience());
        profile.setExperienceYears(updated.getExperienceYears());
        profile.setLocation(updated.getLocation());
        profile.setOpenToWork(updated.getOpenToWork());

        // temporary completion logic
        profile.setProfileCompletion(60);

        return profileService.save(profile);
    }

}
