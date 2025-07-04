// src/components/BadgeDisplay.jsx

import React from 'react';

const badgeIcons = {
  'Top Mentor': '🥇',
  'Fast Responder': '⏱',
  '5-Star Rated': '🌟',
  'Skill Swapper': '🔄',
  'Active Member': '🔥',
};

export default function BadgeDisplay({ badges }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div style={styles.container}>
      <h4>User Badges</h4>
      <div style={styles.badges}>
        {badges.map((badge, index) => (
          <span key={index} style={styles.badge}>
            {badgeIcons[badge] || '🏅'} {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1rem',
    background: '#f8f9fa',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  badge: {
    background: '#fff',
    padding: '0.4rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    border: '1px solid #ccc',
    display: 'inline-block',
  },
};
