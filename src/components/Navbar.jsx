import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { session, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      if (!session?.user) return;

      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', session.user.id)
        .eq('read', false);

      if (!error && typeof count === 'number') {
        setUnreadCount(count);
      }
    };

    fetchUnread();
  }, [session]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">⚡ SkillSwap</Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {session ? (
            <>
              <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
              <li><Link to="/explore" onClick={() => setMenuOpen(false)}>Explore</Link></li>
              <li><Link to="/match" onClick={() => setMenuOpen(false)}>Match</Link></li>
              <li>
                <Link to="/chat/general" onClick={() => setMenuOpen(false)}>
                  Chat {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                </Link>
              </li>
              <li><Link to="/schedule" onClick={() => setMenuOpen(false)}>Schedule</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Login</Link></li>
          )}

          {/* ✅ Dark Mode Toggle beside login/logout */}
          <li>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
