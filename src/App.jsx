// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProfileForm from './pages/ProfileForm';
import MatchPage from './pages/MatchPage';
import ChatPage from './pages/ChatPage';
import Explore from './pages/Explore';
import SchedulePage from './pages/SchedulePage';
import UserProfile from './pages/UserProfile';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Navbar />
          <div className="main-wrapper">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/match" element={<MatchPage />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </div>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
