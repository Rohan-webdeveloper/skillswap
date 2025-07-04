// src/components/UserCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserCard({ user }) {
  const navigate = useNavigate();

  if (!user || !user.id) {
    console.warn("User data missing or id is undefined", user);
    return null; // Don’t render if id is missing
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{user.full_name}</h3>
      <p><strong>Experience:</strong> {user.experience || 'N/A'}</p>

      <div style={styles.actions}>
        <button
          style={styles.button}
          onClick={() => navigate(`/user/${user.id}`)}
        >
          👁 View
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
    transition: 'all 0.2s',
  },
  name: {
    fontSize: '1.1rem',
    color: '#1976d2',
    marginBottom: '0.5rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '1rem',
  },
  button: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
