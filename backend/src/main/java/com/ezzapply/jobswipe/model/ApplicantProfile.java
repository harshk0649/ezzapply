package com.ezzapply.jobswipe.model;

import jakarta.persistence.*;

@Entity
@Table(name = "applicant_profiles")
public class ApplicantProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String headline;
    private String bio;
    private String skills;
    private String experience;
    private String education;
    private String location;
    private String summary;
    private Integer experienceYears;
    private Boolean openToWork;
    private int profileCompletion;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public Boolean getOpenToWork() {
        return openToWork;
    }

    public void setOpenToWork(Boolean openToWork) {
        this.openToWork = openToWork;
    }

    public int getProfileCompletion() {
        return profileCompletion;
    }

    public void setProfileCompletion(int profileCompletion) {
        this.profileCompletion = profileCompletion;
    }
}
