package com.ezzapply.jobswipe.repository;

import com.ezzapply.jobswipe.model.job.Job;
import com.ezzapply.jobswipe.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByRecruiter(User recruiter);
}
