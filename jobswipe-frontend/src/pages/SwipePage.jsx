import TinderCard from 'react-tinder-card';
import { useState } from 'react';

const jobs = [
  { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Remote' },
  { id: 2, title: 'Data Analyst', company: 'Amazon', location: 'Bangalore' },
  { id: 3, title: 'UX Designer', company: 'Adobe', location: 'Noida' },
  { id: 4, title: 'Backend Developer', company: 'Flipkart', location: 'Hyderabad' }
];

const SwipePage = () => {
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, jobTitle) => {
    setLastDirection(direction);
    console.log(`You ${direction} swiped ${jobTitle}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center pt-10">
      <h2 className="text-3xl font-semibold mb-4">Swipe Through Jobs</h2>
      <div className="w-full max-w-xs relative h-[500px]">
        {jobs.map((job) => (
          <TinderCard
            className="absolute w-full h-full"
            key={job.id}
            onSwipe={(dir) => swiped(dir, job.title)}
            preventSwipe={['up', 'down']}
          >
            <div className="bg-white w-full h-full rounded-2xl shadow-xl flex flex-col justify-center items-center p-6">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm">📍 {job.location}</p>
              <p className="text-sm">📍 {job.location}</p>

            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection && (
        <p className="mt-6 text-lg">You swiped <strong>{lastDirection}</strong></p>
      )}
    </div>
  );
};

export default SwipePage;
