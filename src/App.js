import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// 导入组件和上下文
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Assets from './pages/Assets';
import TaskBoard from './pages/TaskBoard';
import Team from './pages/Team';
import Versions from './pages/Versions';
import GoogleCallback from './pages/GoogleCallback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/tasks" element={<TaskBoard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/versions" element={<Versions />} />
              <Route path="/auth/google/callback" element={<GoogleCallback />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;