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
    salaryMax: ""
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
    <div>
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" onChange={handleChange} />
        <textarea name="description" placeholder="Job Description" onChange={handleChange} />
        <textarea name="requirements" placeholder="Requirements" onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />

        <select name="jobType" onChange={handleChange}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>

        <select name="workMode" onChange={handleChange}>
          <option value="ONSITE">Onsite</option>
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
        </select>

        <input type="number" name="experienceYears" placeholder="Experience (years)" onChange={handleChange} />
        <input type="number" name="salaryMin" placeholder="Salary Min" onChange={handleChange} />
        <input type="number" name="salaryMax" placeholder="Salary Max" onChange={handleChange} />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}
