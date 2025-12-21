import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import AuthService from '../services/auth.service';
import '../styles/Auth.css';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'applicant'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      await AuthService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      
      // Login the user after successful registration
      await AuthService.login(formData.email, formData.password);
      
      // Show success step
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    const user = AuthService.getCurrentUser();
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user.role === 'recruiter') {
      navigate('/recruiter/dashboard');
    } else {
      navigate('/jobs');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">EzzApply</Link>
          <h1>{step === 3 ? 'Success!' : 'Create an Account'}</h1>
          {step !== 3 && <p>Join EzzApply to find your dream job</p>}
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={(e) => e.preventDefault()} className="auth-form">
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>I am a:</label>
                <div className="role-selector">
                  <label className={`role-option ${formData.role === 'applicant' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="applicant"
                      checked={formData.role === 'applicant'}
                      onChange={handleChange}
                    />
                    <span>Job Seeker</span>
                  </label>
                  <label className={`role-option ${formData.role === 'recruiter' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={formData.role === 'recruiter'}
                      onChange={handleChange}
                    />
                    <span>Recruiter</span>
                  </label>
                </div>
              </div>
              
              <button 
                type="button" 
                className="auth-button"
                onClick={nextStep}
              >
                Continue
              </button>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="password-requirements">
                  <p>Password must be at least 8 characters</p>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="auth-button secondary"
                  onClick={prevStep}
                  style={{ marginBottom: '10px', background: '#f5f5f5', color: '#333' }}
                >
                  Back
                </button>
                <button 
                  type="button" 
                  className="auth-button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </>
          )}
          
          {step === 3 && (
            <div className="success-message">
              <CheckCircle size={64} color="#4caf50" />
              <h2>Registration Successful</h2>
              <p>Your account has been created successfully.</p>
              <button 
                type="button" 
                className="auth-button"
                onClick={goToDashboard}
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </form>
        
        {step !== 3 && (
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}

