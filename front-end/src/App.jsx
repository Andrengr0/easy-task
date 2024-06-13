import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/login/Login';
import TodoPage from './components/TodoPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToLogin />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/todos" element={isLoggedIn ? <TodoPage /> : <RedirectToLogin />} />
      </Routes>
    </Router>
  );
}

function RedirectToLogin() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null;
}

export default App;
