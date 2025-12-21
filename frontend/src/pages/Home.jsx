import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Briefcase, Users, Building, Star } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <div className="home-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo">
            <h1>EzzApply</h1>
          </div>
          <nav className="main-nav">
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">Log In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job With Just a Swipe</h1>
          <p>EzzApply makes job hunting simple and fun. Swipe right to apply, swipe left to pass.</p>
          <div className="cta-container">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="email-input"
            />
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Jobs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Users</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.png" alt="EzzApply app demonstration" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Why Choose EzzApply?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Search size={32} /></div>
            <h3>Smart Matching</h3>
            <p>Our AI matches you with jobs that fit your skills and preferences.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Briefcase size={32} /></div>
            <h3>One-Click Apply</h3>
            <p>Apply to jobs with a single swipe - no lengthy forms.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Users size={32} /></div>
            <h3>Direct Contact</h3>
            <p>Connect directly with recruiters when there's mutual interest.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Building size={32} /></div>
            <h3>Top Companies</h3>
            <p>Access opportunities at thousands of vetted companies.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Sign up and build your profile with your skills, experience, and preferences.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse Jobs</h3>
            <p>View personalized job recommendations based on your profile.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Swipe & Match</h3>
            <p>Swipe right on jobs you like, left on those you don't.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Hired</h3>
            <p>When there's mutual interest, connect with employers and get hired!</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#FBBC05" color="#FBBC05" />
              ))}
            </div>
            <p>"I found my dream job in just 3 days using EzzApply. The interface is so intuitive!"</p>
            <div className="testimonial-author">
              <img src="https://via.placeholder.com/50" alt="User" />
              <div>
                <h4>Sarah Johnson</h4>
                <p>Software Developer</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#FBBC05" color="#FBBC05" />
              ))}
            </div>
            <p>"As a recruiter, EzzApply has revolutionized how we find talent. Highly recommended!"</p>
            <div className="testimonial-author">
              <img src="https://via.placeholder.com/50" alt="User" />
              <div>
                <h4>Michael Chen</h4>
                <p>HR Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>EzzApply</h2>
            <p>Making job hunting simple and effective.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/guides">Guides</a></li>
                <li><a href="/help">Help Center</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EzzApply. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
