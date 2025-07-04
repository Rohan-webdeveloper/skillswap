// src/components/ProfileProgress.jsx

import React from 'react';

export default function ProfileProgress({ profile }) {
  const fields = ['name', 'bio', 'skills', 'experience', 'portfolio', 'availability'];
  const filled = fields.filter(field => profile[field]);
  const percent = Math.round((filled.length / fields.length) * 100);

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>Profile Completion: {percent}%</label>
      <div style={styles.barWrapper}>
        <div style={{ ...styles.bar, width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { margin: '1rem 0' },
  label: { marginBottom: '0.5rem', display: 'block', fontWeight: 'bold' },
  barWrapper: {
    width: '100%',
    height: '10px',
    backgroundColor: '#eee',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.3s ease',
  },
};
