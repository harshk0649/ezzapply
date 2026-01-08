import { useState } from "react";
import { createJobApi } from "../../api/job.api";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    skills: "",
    location: "",
    jobType: "Full-time",
    workMode: "ONSITE",
    experienceYears: "",
    salaryMin: "",
    salaryMax: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createJobApi({
        ...form,
        experienceYears: Number(form.experienceYears),
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
      });

      alert("Job posted successfully 🚀");
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Create a Job Posting
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to publish a new job opening
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* JOB TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              name="title"
              placeholder="e.g. Java Backend Developer"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the role, responsibilities, and expectations"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* REQUIREMENTS */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Requirements
            </label>
            <textarea
              name="requirements"
              rows="3"
              placeholder="Required qualifications and experience"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* GRID: SKILLS + LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                name="skills"
                placeholder="Java, Spring Boot, MySQL"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                name="location"
                placeholder="Bangalore, India"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>

          {/* GRID: JOB TYPE + WORK MODE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                name="jobType"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Mode
              </label>
              <select
                name="workMode"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="ONSITE">Onsite</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>

          {/* GRID: EXPERIENCE + SALARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience (Years)
              </label>
              <input
                type="number"
                name="experienceYears"
                placeholder="2"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary Min
              </label>
              <input
                type="number"
                name="salaryMin"
                placeholder="500000"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary Max
              </label>
              <input
                type="number"
                name="salaryMax"
                placeholder="1200000"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
