package com.ezzapply.jobportal.application;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    // recruiter dashboard
    List<JobApplication> findByJobId(Long jobId);

    // seeker dashboard
    List<JobApplication> findByApplicantId(Long applicantId);

    boolean existsByApplicantIdAndJobId(Long applicantId, Long jobId);
}
