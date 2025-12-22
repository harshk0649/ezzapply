package com.ezzapply.jobswipe.model.application;

import com.ezzapply.jobswipe.model.user.User;
import jakarta.persistence.*;

@Entity
@Table(name = "applicant_profiles")
public class ApplicantProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== USER LINK =====
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // ===== BASIC INFO =====
    private String headline;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String location;
    private Boolean openToWork;

    // ===== SKILLS & EXPERIENCE =====
    @Column(columnDefinition = "TEXT")
    private String skills; // Java, Spring, React

    private String currentRole;
    private Integer experienceYears;

    @Column(columnDefinition = "TEXT")
    private String experienceDetails;

    // ===== EDUCATION =====
    private String highestEducation;

    @Column(columnDefinition = "TEXT")
    private String educationDetails;

    // ===== LINKS & RESUME =====
    private String resumeUrl;
    private String portfolioUrl;
    private String linkedinUrl;
    private String githubUrl;

    // ===== JOB PREFERENCES =====
    private String preferredJobType; // Full-time, Internship
    private String preferredLocation;
    private Integer expectedSalaryMin;
    private Integer expectedSalaryMax;
    private Boolean remotePreferred;

    // ===== META =====
    private int profileCompletion;

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Boolean getOpenToWork() { return openToWork; }
    public void setOpenToWork(Boolean openToWork) { this.openToWork = openToWork; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getCurrentRole() { return currentRole; }
    public void setCurrentRole(String currentRole) { this.currentRole = currentRole; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getExperienceDetails() { return experienceDetails; }
    public void setExperienceDetails(String experienceDetails) {
        this.experienceDetails = experienceDetails;
    }

    public String getHighestEducation() { return highestEducation; }
    public void setHighestEducation(String highestEducation) {
        this.highestEducation = highestEducation;
    }

    public String getEducationDetails() { return educationDetails; }
    public void setEducationDetails(String educationDetails) {
        this.educationDetails = educationDetails;
    }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getPreferredJobType() { return preferredJobType; }
    public void setPreferredJobType(String preferredJobType) {
        this.preferredJobType = preferredJobType;
    }

    public String getPreferredLocation() { return preferredLocation; }
    public void setPreferredLocation(String preferredLocation) {
        this.preferredLocation = preferredLocation;
    }

    public Integer getExpectedSalaryMin() { return expectedSalaryMin; }
    public void setExpectedSalaryMin(Integer expectedSalaryMin) {
        this.expectedSalaryMin = expectedSalaryMin;
    }

    public Integer getExpectedSalaryMax() { return expectedSalaryMax; }
    public void setExpectedSalaryMax(Integer expectedSalaryMax) {
        this.expectedSalaryMax = expectedSalaryMax;
    }

    public Boolean getRemotePreferred() { return remotePreferred; }
    public void setRemotePreferred(Boolean remotePreferred) {
        this.remotePreferred = remotePreferred;
    }

    public int getProfileCompletion() { return profileCompletion; }
    public void setProfileCompletion(int profileCompletion) {
        this.profileCompletion = profileCompletion;
    }
}
