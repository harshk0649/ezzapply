package com.ezzapply.jobportal.profile;

import com.ezzapply.jobportal.user.User;
import com.ezzapply.jobportal.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final UserRepository userRepo;
    private final JobSeekerProfileRepository seekerRepo;
    private final RecruiterProfileRepository recruiterRepo;

    public ProfileService(UserRepository userRepo,
                          JobSeekerProfileRepository seekerRepo,
                          RecruiterProfileRepository recruiterRepo) {
        this.userRepo = userRepo;
        this.seekerRepo = seekerRepo;
        this.recruiterRepo = recruiterRepo;
    }

    public JobSeekerProfile saveJobSeekerProfile(Long userId,
                                                 JobSeekerProfile profile) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        profile.setUser(user);
        return seekerRepo.save(profile);
    }

    public RecruiterProfile saveRecruiterProfile(Long userId,
                                                 RecruiterProfile profile) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        profile.setUser(user);
        return recruiterRepo.save(profile);
    }
}
