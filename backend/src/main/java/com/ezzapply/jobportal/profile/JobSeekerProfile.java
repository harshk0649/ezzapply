package com.ezzapply.jobportal.profile;

import com.ezzapply.jobportal.common.BaseEntity;
import com.ezzapply.jobportal.user.User;
import jakarta.persistence.*;

@Entity
@Table(name = "job_seeker_profiles")
public class JobSeekerProfile extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String headline;           // e.g. "Java Backend Developer"
    private String skills;             // comma-separated for now
    private Integer experienceYears;
    private String education;
    private String resumeUrl;
    private String location;

    // -------- getters & setters --------

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
