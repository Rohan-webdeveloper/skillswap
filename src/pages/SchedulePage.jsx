// src/pages/SchedulePage.jsx

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function SchedulePage() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    with_user: '',
    topic: '',
    datetime: '',
    link: '',
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
      .or(`host.eq.${user.id},with_user.eq.${user.id}`)
      .order('datetime', { ascending: true });

    if (error) {
      console.error('Error fetching schedules:', error);
    } else {
      setSchedules(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('schedule').insert([
      {
        host: user.id,
        with_user: formData.with_user,
        topic: formData.topic,
        datetime: formData.datetime,
        link: formData.link,
      },
    ]);
    if (error) {
      console.error('Insert error:', error);
    } else {
      setFormData({ with_user: '', topic: '', datetime: '', link: '' });
      fetchSchedules();
    }
  };

  return (
    <div style={styles.container}>
      <h2>📅 Schedule a Session</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="With User ID"
          value={formData.with_user}
          onChange={(e) => setFormData({ ...formData, with_user: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={formData.datetime}
          onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Meeting Link (optional)"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />
        <button type="submit">Schedule</button>
      </form>

      <h3>Your Scheduled Sessions</h3>
      <ul style={styles.list}>
        {schedules.map((s, i) => (
          <li key={i} style={styles.card}>
            <p><strong>With:</strong> {s.with_user}</p>
            <p><strong>Topic:</strong> {s.topic}</p>
            <p><strong>Date:</strong> {new Date(s.datetime).toLocaleString()}</p>
            {s.link && (
              <p>
                <strong>Link:</strong>{' '}
                <a href={s.link} target="_blank" rel="noreferrer">
                  Join
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: '700px', margin: '2rem auto', padding: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' },
  list: { listStyle: 'none', padding: 0 },
  card: {
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem',
    background: '#fefefe',
  },
};
