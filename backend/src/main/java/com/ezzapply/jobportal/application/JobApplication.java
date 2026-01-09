package com.ezzapply.jobportal.application;

import com.ezzapply.jobportal.common.BaseEntity;
import com.ezzapply.jobportal.job.Job;
import com.ezzapply.jobportal.user.User;
import jakarta.persistence.*;

@Entity
@Table(
    name = "job_applications",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"applicant_id", "job_id"}
    )
)
public class JobApplication extends BaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "applicant_id")
    private User applicant;

    @ManyToOne(optional = false)
    @JoinColumn(name = "job_id")
    private Job job;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    // ---------- ID ----------
    public Long getId() {
        return id;
    }

    // ---------- Applicant ----------
    public User getApplicant() {
        return applicant;
    }

    public void setApplicant(User applicant) {
        this.applicant = applicant;
    }

    // ---------- Job ----------
    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    // ---------- Status ----------
    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}
