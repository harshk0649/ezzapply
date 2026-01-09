package com.ezzapply.jobportal.swipe;

import com.ezzapply.jobportal.application.*;
import com.ezzapply.jobportal.job.*;
import com.ezzapply.jobportal.user.User;
import com.ezzapply.jobportal.user.UserRole;
import java.util.List;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SwipeService {

    private static final int DAILY_LIMIT = 10;

    private final JobRepository jobRepo;
    private final ApplicationRepository appRepo;
    private final DailySwipeCreditRepository creditRepo;

    public SwipeService(
            JobRepository jobRepo,
            ApplicationRepository appRepo,
            DailySwipeCreditRepository creditRepo
    ) {
        this.jobRepo = jobRepo;
        this.appRepo = appRepo;
        this.creditRepo = creditRepo;
    }

    public JobApplication swipeApply(User user, Long jobId) {

        // 🔒 BUSINESS RULE
        if (user.getRole() != UserRole.JOB_SEEKER) {
            throw new RuntimeException("Only job seekers can apply to jobs");
        }

        if (appRepo.existsByApplicantIdAndJobId(user.getId(), jobId)) {
            throw new RuntimeException("You have already applied to this job");
        }

        DailySwipeCredit credit = getTodayCredit(user);

        if (credit.getRemainingCredits() <= 0) {
            throw new RuntimeException("Daily swipe limit exceeded");
        }

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        JobApplication app = new JobApplication();
        app.setApplicant(user);
        app.setJob(job);
        app.setStatus(ApplicationStatus.APPLIED);

        credit.setRemainingCredits(credit.getRemainingCredits() - 1);
        creditRepo.save(credit);

        return appRepo.save(app);
    }


    // ---------- PUBLIC ----------
    public int getRemainingCredits(User user) {
        return getTodayCredit(user).getRemainingCredits();
    }

    // ---------- INTERNAL ----------
    private DailySwipeCredit getTodayCredit(User user) {
        LocalDate today = LocalDate.now();

        return creditRepo.findByUserIdAndCreditDate(user.getId(), today)
                .orElseGet(() -> {
                    DailySwipeCredit c = new DailySwipeCredit();
                    c.setUser(user);
                    c.setCreditDate(today);
                    c.setRemainingCredits(DAILY_LIMIT);
                    return creditRepo.save(c);
                });
    }



    public List<Job> getSwipeJobs(User user) {

        if (user.getRole() != UserRole.JOB_SEEKER) {
            throw new RuntimeException("Only job seekers can swipe jobs");
        }

        List<Job> allJobs = jobRepo.findAll();

        return allJobs.stream()
                .filter(job ->
                        !appRepo.existsByApplicantIdAndJobId(
                                user.getId(),
                                job.getId()
                        )
                )
                .toList();
    }

}
