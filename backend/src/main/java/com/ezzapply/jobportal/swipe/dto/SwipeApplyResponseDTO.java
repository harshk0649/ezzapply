package com.ezzapply.jobportal.swipe.dto;

public class SwipeApplyResponseDTO {

    private Long applicationId;
    private Long jobId;
    private String status;
    private int remainingCredits;

    public SwipeApplyResponseDTO(
            Long applicationId,
            Long jobId,
            String status,
            int remainingCredits
    ) {
        this.applicationId = applicationId;
        this.jobId = jobId;
        this.status = status;
        this.remainingCredits = remainingCredits;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getStatus() {
        return status;
    }

    public int getRemainingCredits() {
        return remainingCredits;
    }
}
