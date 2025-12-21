import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import SwipePage from './pages/SwipePage';
import JobSwipePage from './pages/JobSwipePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/swipe" element={<SwipePage />} />
        <Route path="/jobs" element={<JobSwipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
