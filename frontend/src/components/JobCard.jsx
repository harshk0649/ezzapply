import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', background: '#fff' }}>
      <h2>{job.title}</h2>
      <p>{job.company}</p>
    </div>
  );
};

export default JobCard;
