package com.ezzapply.jobportal.applicant.dto;

public class ApplicantApplicationDTO {

    private Long applicationId;
    private String status;

    private Long jobId;
    private String jobTitle;
    private String jobLocation;
    private String recruiterName;

    // ---------- constructor ----------
    public ApplicantApplicationDTO(
            Long applicationId,
            String status,
            Long jobId,
            String jobTitle,
            String jobLocation,
            String recruiterName
    ) {
        this.applicationId = applicationId;
        this.status = status;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.jobLocation = jobLocation;
        this.recruiterName = recruiterName;
    }

    // ---------- getters ----------
    public Long getApplicationId() {
        return applicationId;
    }

    public String getStatus() {
        return status;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getJobLocation() {
        return jobLocation;
    }

    public String getRecruiterName() {
        return recruiterName;
    }
}
