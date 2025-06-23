import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const jobData = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    description: 'Build beautiful UI with React.',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'CodeBase',
    location: 'Bangalore',
    description: 'Design scalable APIs.',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'DevHub',
    location: 'Delhi',
    description: 'Work across frontend and backend.',
  },
];

export default function SwipeJobs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);

  const handleSwipe = (direction) => {
    const job = jobData[currentIndex];
    if (direction === 'right') {
      setAcceptedJobs([...acceptedJobs, job]);
    } else if (direction === 'left') {
      setRejectedJobs([...rejectedJobs, job]);
    }
    setCurrentIndex(currentIndex + 1);
  };

  const job = jobData[currentIndex];

  if (!job) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white bg-black">
        <h2 className="text-2xl font-bold mb-4">No more jobs to swipe! 🎉</h2>
        <p className="text-orange-400">Accepted: {acceptedJobs.length} | Rejected: {rejectedJobs.length}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-orange-900 text-white flex flex-col items-center justify-center px-4">
      <TinderCard
        key={job.id}
        onSwipe={handleSwipe}
        preventSwipe={['up', 'down']}
      >
        <div className="w-80 p-6 rounded-xl shadow-2xl bg-gray-800 border border-orange-400 text-center">
          <h3 className="text-xl font-bold mb-2">{job.title}</h3>
          <p className="text-orange-300">{job.company}</p>
          <p className="mb-4 text-sm">{job.location}</p>
          <p className="text-sm text-gray-300">{job.description}</p>
        </div>
      </TinderCard>

      <div className="flex gap-10 mt-6">
        <button
          onClick={() => handleSwipe('left')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}