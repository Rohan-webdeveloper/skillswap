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

const backgroundImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1950&q=80';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <Navbar />
              <main style={{ flex: 1, padding: '1rem' }}>
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
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
