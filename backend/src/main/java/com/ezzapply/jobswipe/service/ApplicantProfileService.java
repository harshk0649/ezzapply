package com.ezzapply.jobswipe.service;

import com.ezzapply.jobswipe.model.ApplicantProfile;
import com.ezzapply.jobswipe.model.User;
import com.ezzapply.jobswipe.repository.ApplicantProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class ApplicantProfileService {

    private final ApplicantProfileRepository profileRepository;

    public ApplicantProfileService(ApplicantProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    // called on signup
    public ApplicantProfile createEmptyProfile(User user) {
        ApplicantProfile profile = new ApplicantProfile();
        profile.setUser(user);
        profile.setProfileCompletion(10);
        return profileRepository.save(profile);
    }

    public ApplicantProfile getProfile(User user) {
        return profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public ApplicantProfile updateBasicInfo(
            User user,
            String headline,
            String summary,
            String location,
            Integer experience,
            Boolean openToWork
    ) {
        ApplicantProfile profile = getProfile(user);

        profile.setHeadline(headline);
        profile.setSummary(summary);
        profile.setLocation(location);
        profile.setExperienceYears(experience);
        profile.setOpenToWork(openToWork);
        profile.setProfileCompletion(30);

        return profileRepository.save(profile);
    }

    public ApplicantProfile save(ApplicantProfile profile) {
        return profileRepository.save(profile);
    }
}
