// src/pages/Dashboard.jsx

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [name, setName] = useState('');

  useEffect(() => {
    fetchUser();
  }, [user]);

  const fetchUser = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();
    if (data) setName(data.full_name);
  };

  return (
    <div style={styles.container}>
      <h2>Welcome {name || 'User'} 👋</h2>
      <div style={styles.grid}>
        <Link to="/profile" style={styles.card}>📝 Edit Profile</Link>
        <Link to="/explore" style={styles.card}>🌍 Explore Users</Link>
        <Link to="/match" style={styles.card}>🤝 Skill Match</Link>
        <Link to="/schedule" style={styles.card}>📅 Schedule</Link>
        <Link to="/chat/any" style={styles.card}>💬 Chat</Link>
        <button onClick={logout} style={styles.logout}>🚪 Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '2rem',
  },
  card: {
    background: '#f0f0f0',
    padding: '1.2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  logout: {
    gridColumn: 'span 2',
    marginTop: '1rem',
    padding: '10px 20px',
    background: '#e63946',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
