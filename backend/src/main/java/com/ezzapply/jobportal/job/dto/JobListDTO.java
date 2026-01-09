package com.ezzapply.jobportal.job.dto;

public class JobListDTO {

    private Long jobId;
    private String title;
    private String location;
    private Integer experienceRequired;
    private String recruiterName;

    public JobListDTO(
            Long jobId,
            String title,
            String location,
            Integer experienceRequired,
            String recruiterName
    ) {
        this.jobId = jobId;
        this.title = title;
        this.location = location;
        this.experienceRequired = experienceRequired;
        this.recruiterName = recruiterName;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getTitle() {
        return title;
    }

    public String getLocation() {
        return location;
    }

    public Integer getExperienceRequired() {
        return experienceRequired;
    }

    public String getRecruiterName() {
        return recruiterName;
    }
}
