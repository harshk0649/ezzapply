import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import SwipePage from './pages/SwipePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/swipe" element={<SwipePage />} />
      </Routes>
    </Router>
  );
}

export default App;