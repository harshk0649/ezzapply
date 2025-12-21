import { useState, useRef, useEffect } from 'react';
import { X, Check, Info, Briefcase, MapPin, Building, Star, Clock } from 'lucide-react';
import '../styles/JobSwipePage.css';

// This would come from your API in a real application
const dummyJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechGiant Inc.',
    location: 'Remote / New York',
    salary: '$120K - $150K',
    description: 'Join our team to build cutting-edge web applications using React and modern frontend technologies. You\'ll work on high-impact projects that reach millions of users worldwide. We\'re looking for someone who is passionate about creating exceptional user experiences and can help mentor junior developers.',
    skills: ['React', 'TypeScript', 'CSS', 'Redux', 'Jest'],
    logo: 'https://via.placeholder.com/150?text=TG',
    color: '#4285F4',
    postedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'StartupBoost',
    location: 'San Francisco',
    salary: '$130K - $160K',
    description: 'Looking for a versatile developer who can work across our entire stack to deliver amazing user experiences. You\'ll be involved in all aspects of development from database design to frontend implementation. We\'re a fast-growing startup with a collaborative culture and exciting challenges.',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS', 'GraphQL'],
    logo: 'https://via.placeholder.com/150?text=SB',
    color: '#34A853',
    postedDate: '1 week ago'
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'CreativeMinds',
    location: 'Remote / London',
    salary: '$90K - $120K',
    description: 'Help us create beautiful, intuitive interfaces that delight our users and solve real problems. You\'ll collaborate with product managers and developers to design experiences that are both visually stunning and highly functional. We value design thinking and user-centered approaches.',
    skills: ['Figma', 'UI Design', 'User Research', 'Prototyping', 'Design Systems'],
    logo: 'https://via.placeholder.com/150?text=CM',
    color: '#FBBC05',
    postedDate: '3 days ago'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudNative Solutions',
    location: 'Remote / Berlin',
    salary: '$110K - $140K',
    description: 'Join our infrastructure team to build and maintain scalable, reliable systems that power our growing platform. You\'ll work with cutting-edge cloud technologies and help establish best practices for deployment, monitoring, and security.',
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform'],
    logo: 'https://via.placeholder.com/150?text=CN',
    color: '#EA4335',
    postedDate: 'Just now'
  }
];

export default function JobSwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [swipedJobs, setSwipedJobs] = useState({ applied: [], rejected: [], saved: [] });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardRef = useRef(null);

  const currentJob = dummyJobs[currentIndex];
  
  // Add touch swipe functionality
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    let startX = 0;
    let currentX = 0;
    
    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
    }
    
    function handleTouchMove(e) {
      if (isTransitioning || showDetails) return;
      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      
      // Limit rotation to 30 degrees max
      const rotation = deltaX / 20;
      const limitedRotation = Math.max(Math.min(rotation, 15), -15);
      
      // Apply transform to the card
      card.style.transform = `translateX(${deltaX}px) rotate(${limitedRotation}deg)`;
      
      // Change opacity of buttons based on swipe direction
      if (deltaX > 50) {
        document.querySelector('.swipe-button.apply').style.opacity = '1';
        document.querySelector('.swipe-button.reject').style.opacity = '0.5';
      } else if (deltaX < -50) {
        document.querySelector('.swipe-button.apply').style.opacity = '0.5';
        document.querySelector('.swipe-button.reject').style.opacity = '1';
      } else {
        document.querySelector('.swipe-button.apply').style.opacity = '1';
        document.querySelector('.swipe-button.reject').style.opacity = '1';
      }
    }
    
    function handleTouchEnd() {
      if (showDetails) return;
      const deltaX = currentX - startX;
      
      if (deltaX > 100) {
        handleSwipe('right');
      } else if (deltaX < -100) {
        handleSwipe('left');
      } else {
        // Reset card position if not swiped enough
        card.style.transform = '';
      }
      
      // Reset button opacity
      document.querySelector('.swipe-button.apply').style.opacity = '1';
      document.querySelector('.swipe-button.reject').style.opacity = '1';
    }
    
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, isTransitioning, showDetails]);
  
  const handleSwipe = (direction) => {
    if (!currentJob || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Add animation class
    if (cardRef.current) {
      cardRef.current.classList.add(`swipe-${direction}`);
      
      // Remove animation class after animation completes
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.remove(`swipe-${direction}`);
          cardRef.current.style.transform = '';
        }
        
        // Update state after animation
        if (direction === 'right') {
          setSwipedJobs({
            ...swipedJobs,
            applied: [...swipedJobs.applied, currentJob]
          });
        } else {
          setSwipedJobs({
            ...swipedJobs,
            rejected: [...swipedJobs.rejected, currentJob]
          });
        }
        
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
        setShowDetails(false);
      }, 500);
    }
  };
  
  const handleSaveJob = () => {
    if (!currentJob) return;
    
    // Check if job is already saved
    const isAlreadySaved = swipedJobs.saved.some(job => job.id === currentJob.id);
    
    if (isAlreadySaved) {
      // Remove from saved
      setSwipedJobs({
        ...swipedJobs,
        saved: swipedJobs.saved.filter(job => job.id !== currentJob.id)
      });
    } else {
      // Add to saved
      setSwipedJobs({
        ...swipedJobs,
        saved: [...swipedJobs.saved, currentJob]
      });
    }
    
    // Show visual feedback
    const saveButton = document.querySelector('.swipe-button.save');
    if (!isAlreadySaved) {
      saveButton.classList.add('saved');
      setTimeout(() => {
        saveButton.classList.remove('saved');
      }, 1000);
    }
  };

  if (!currentJob) {
    return (
      <div className="job-swipe-container empty-state">
        <h2>No more jobs to show!</h2>
        <p>You've applied to {swipedJobs.applied.length} jobs</p>
        <div className="empty-state-actions">
          <button className="primary-button">View Applied Jobs</button>
          <button className="secondary-button">Browse More Jobs</button>
        </div>
      </div>
    );
  }

  // Check if current job is saved
  const isJobSaved = swipedJobs.saved.some(job => job.id === currentJob.id);

  return (
    <div className="job-swipe-container">
      <header className="app-header">
        <h1>EzzApply</h1>
        <div className="user-profile">
          <img src="https://via.placeholder.com/40" alt="Profile" className="profile-pic" />
        </div>
      </header>

      <main>
        <div className="card-container">
          <div 
            ref={cardRef}
            className={`job-card ${showDetails ? 'show-details' : ''}`}
            style={{ borderTop: `5px solid ${currentJob.color}` }}
          >
            <div className="job-card-front">
              <div className="company-logo" style={{ backgroundColor: currentJob.color }}>
                <img src={currentJob.logo} alt={currentJob.company} />
              </div>
              
              <h2 className="job-title">{currentJob.title}</h2>
              
              <div className="job-meta">
                <p><Building size={18} /> {currentJob.company}</p>
                <p><MapPin size={18} /> {currentJob.location}</p>
                <p><Briefcase size={18} /> {currentJob.salary}</p>
                <p><Clock size={18} /> {currentJob.postedDate}</p>
              </div>
              
              <div className="skills-container">
                {currentJob.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
              
              <div className="swipe-hint">
                <p>← Swipe left to pass • Swipe right to apply →</p>
              </div>
              
              <button 
                className="details-button"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            
            <div className="job-card-back">
              <h3>Job Description</h3>
              <p>{currentJob.description}</p>
              
              <h3>Required Skills</h3>
              <div className="skills-container">
                {currentJob.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
              
              <button 
                className="details-button"
                onClick={() => setShowDetails(!showDetails)}
              >
                Back to Job
              </button>
            </div>
          </div>
        </div>

        <div className="swipe-controls">
          <button 
            className="swipe-button reject"
            onClick={() => handleSwipe('left')}
            aria-label="Reject job"
          >
            <X size={28} />
          </button>
          
          <button 
            className={`swipe-button save ${isJobSaved ? 'saved' : ''}`}
            onClick={handleSaveJob}
            aria-label="Save job"
          >
            <Star size={28} />
          </button>
          
          <button 
            className="swipe-button info"
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Job details"
          >
            <Info size={28} />
          </button>
          
          <button 
            className="swipe-button apply"
            onClick={() => handleSwipe('right')}
            aria-label="Apply to job"
          >
            <Check size={28} />
          </button>
        </div>
      </main>
      
      <div className="swipe-status">
        <p>Applied: {swipedJobs.applied.length} | Saved: {swipedJobs.saved.length} | Passed: {swipedJobs.rejected.length}</p>
      </div>
    </div>
  );
}



