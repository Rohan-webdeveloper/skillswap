import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { format } from 'timeago.js';
import toast, { Toaster } from 'react-hot-toast'; // ✅ Toast

export default function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (data) setProfile(data);
    };

    fetchProfile();
  }, [id]);

  const handleCopy = () => {
    const url = `${window.location.origin}/user/${id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <Toaster position="top-center" />
      <h2>{profile.full_name}</h2>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Skills:</strong> {profile.skills}</p>
      <p><strong>Experience:</strong> {profile.experience}</p>
      <p><strong>Availability:</strong> {profile.availability || 'Not set'}</p>

      {profile.portfolio && (
        <p>
          <strong>Portfolio:</strong>{' '}
          <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
            {profile.portfolio}
          </a>
        </p>
      )}

      {profile.last_seen && (
        <p><strong>Last Seen:</strong> {format(profile.last_seen)}</p>
      )}

      <div style={styles.linkBox}>
        <input
          type="text"
          value={`${window.location.origin}/user/${id}`}
          readOnly
          style={styles.input}
        />
        <button onClick={handleCopy} style={styles.copyButton}>📋 Copy Link</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1.5rem',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    lineHeight: '1.7',
  },
  linkBox: {
    marginTop: '1rem',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    padding: '0.6rem',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  copyButton: {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
