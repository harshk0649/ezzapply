import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";

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
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      
      <div className="flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Build Your Profile
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Complete your profile to help recruiters find you
          </p>

          <form onSubmit={submit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Basic Information
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Headline
                </label>
                <input
                  name="headline"
                  placeholder="e.g., Senior Software Engineer"
                  value={profile.headline}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Summary
                </label>
                <textarea
                  name="summary"
                  placeholder="Tell us about yourself..."
                  value={profile.summary}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Skills
                </label>
                <input
                  name="skills"
                  placeholder="e.g., React, Node.js, Python"
                  value={profile.skills}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  name="location"
                  placeholder="e.g., New York, NY"
                  value={profile.location}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Experience
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experienceYears"
                  placeholder="e.g., 5"
                  value={profile.experienceYears}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Experience Details
                </label>
                <textarea
                  name="experienceDetails"
                  placeholder="Describe your work experience..."
                  value={profile.experienceDetails}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Education
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Highest Education
                </label>
                <input
                  name="highestEducation"
                  placeholder="e.g., Bachelor's in Computer Science"
                  value={profile.highestEducation}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Education Details
                </label>
                <textarea
                  name="educationDetails"
                  placeholder="Additional education information..."
                  value={profile.educationDetails}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Links & Portfolio
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Resume URL
                </label>
                <input
                  name="resumeUrl"
                  placeholder="https://..."
                  value={profile.resumeUrl}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Portfolio URL
                </label>
                <input
                  name="portfolioUrl"
                  placeholder="https://..."
                  value={profile.portfolioUrl}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  LinkedIn URL
                </label>
                <input
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/..."
                  value={profile.linkedinUrl}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  GitHub URL
                </label>
                <input
                  name="githubUrl"
                  placeholder="https://github.com/..."
                  value={profile.githubUrl}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Job Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Job Preferences
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Preferred Job Type
                </label>
                <input
                  name="preferredJobType"
                  placeholder="e.g., Full-time, Part-time, Contract"
                  value={profile.preferredJobType}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Preferred Location
                </label>
                <input
                  name="preferredLocation"
                  placeholder="e.g., Remote, New York, San Francisco"
                  value={profile.preferredLocation}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Expected Salary Min ($)
                  </label>
                  <input
                    type="number"
                    name="expectedSalaryMin"
                    placeholder="e.g., 80000"
                    value={profile.expectedSalaryMin}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Expected Salary Max ($)
                  </label>
                  <input
                    type="number"
                    name="expectedSalaryMax"
                    placeholder="e.g., 120000"
                    value={profile.expectedSalaryMax}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remotePreferred"
                  checked={profile.remotePreferred}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Open to Remote Work
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}