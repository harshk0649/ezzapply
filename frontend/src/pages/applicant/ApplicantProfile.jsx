import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ApplicantProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    headline: "",
    summary: "",
    skills: "",
    location: "",
    experienceYears: "",
    experienceDetails: "",
    highestEducation: "",
    educationDetails: "",
    resumeUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    preferredJobType: "",
    preferredLocation: "",
    expectedSalaryMin: "",
    expectedSalaryMax: "",
    remotePreferred: false,
  });

  useEffect(() => {
    api.get("/profile/me")
      .then(res => setProfile(res.data))
      .catch(() => console.log("Profile not found"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.put("/profile/me", {
      ...profile,
      experienceYears: Number(profile.experienceYears),
      expectedSalaryMin: Number(profile.expectedSalaryMin),
      expectedSalaryMax: Number(profile.expectedSalaryMax),
    });

    alert("Profile updated ✅");
    navigate("/jobs");
  };

  return (
    <form onSubmit={submit}>
      <h2>Build Your Profile</h2>

      <input name="headline" placeholder="Headline" value={profile.headline} onChange={handleChange} />
      <textarea name="summary" placeholder="Summary" value={profile.summary} onChange={handleChange} />
      <input name="skills" placeholder="Skills" value={profile.skills} onChange={handleChange} />
      <input name="location" placeholder="Location" value={profile.location} onChange={handleChange} />

      <input type="number" name="experienceYears" placeholder="Experience Years" value={profile.experienceYears} onChange={handleChange} />
      <textarea name="experienceDetails" placeholder="Experience Details" value={profile.experienceDetails} onChange={handleChange} />

      <input name="highestEducation" placeholder="Highest Education" value={profile.highestEducation} onChange={handleChange} />
      <textarea name="educationDetails" placeholder="Education Details" value={profile.educationDetails} onChange={handleChange} />

      <input name="resumeUrl" placeholder="Resume URL" value={profile.resumeUrl} onChange={handleChange} />
      <input name="portfolioUrl" placeholder="Portfolio URL" value={profile.portfolioUrl} onChange={handleChange} />

      <label>
        <input type="checkbox" name="remotePreferred" checked={profile.remotePreferred} onChange={handleChange} />
        Open to Remote
      </label>

      <button type="submit">Save Profile</button>
    </form>
  );
}
