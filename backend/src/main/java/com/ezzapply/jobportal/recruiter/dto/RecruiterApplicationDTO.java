package com.ezzapply.jobportal.recruiter.dto;

public class RecruiterApplicationDTO {

    private Long applicationId;
    private String status;

    private Long applicantId;
    private String applicantName;
    private String applicantEmail;

    private Long jobId;
    private String jobTitle;

    public RecruiterApplicationDTO(
            Long applicationId,
            String status,
            Long applicantId,
            String applicantName,
            String applicantEmail,
            Long jobId,
            String jobTitle
    ) {
        this.applicationId = applicationId;
        this.status = status;
        this.applicantId = applicantId;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public String getStatus() {
        return status;
    }

    public Long getApplicantId() {
        return applicantId;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }
}
