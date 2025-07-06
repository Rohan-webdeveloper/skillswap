import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { format } from 'timeago.js';
import toast, { Toaster } from 'react-hot-toast';

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

  const profileUrl = `${window.location.origin}/user/${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Link copied to clipboard!');
  };

  const encodedURL = encodeURIComponent(profileUrl);
  const encodedTitle = encodeURIComponent(`Check out ${profile?.full_name}'s profile on SkillSwap!`);
  const encodedText = encodeURIComponent(profile?.skills || '');

  if (!profile) return <p style={styles.loading}>Loading profile...</p>;

  return (
    <div style={styles.wrapper}>
      <Toaster position="top-center" />
      <div style={styles.card}>

        {/* ✅ Profile Image */}
        {profile.profile_image && (
          <img
            src={profile.profile_image}
            alt="Profile"
            style={styles.avatar}
          />
        )}

        <h2 style={styles.name}>{profile.full_name}</h2>
        <p><strong>📄 Bio:</strong> {profile.bio}</p>
        <p><strong>🛠 Skills:</strong> {profile.skills}</p>
        <p><strong>💼 Experience:</strong> {profile.experience}</p>
        <p><strong>🕒 Availability:</strong> {profile.availability || 'Not set'}</p>

        {profile.portfolio && (
          <p>
            <strong>🌐 Portfolio:</strong>{' '}
            <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" style={styles.link}>
              {profile.portfolio}
            </a>
          </p>
        )}

        {profile.last_seen && (
          <p><strong>🕓 Last Seen:</strong> {format(profile.last_seen)}</p>
        )}

        {/* 🔗 Copy Profile Link */}
        <div style={styles.linkBox}>
          <input
            type="text"
            value={profileUrl}
            readOnly
            style={styles.input}
          />
          <button onClick={handleCopy} style={styles.copyButton}>📋 Copy Link</button>
        </div>

        {/* 🌍 Social Share Buttons */}
        <div style={styles.shareButtons}>
          <p style={{ marginBottom: '0.5rem' }}>🔗 Share this profile:</p>
          <a
            href={`https://wa.me/?text=${encodedTitle}%0A${encodedURL}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.shareBtn}
          >
            WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.shareBtn}
          >
            LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.shareBtn}
          >
            X (Twitter)
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '2rem',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#222',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(5px)',
    lineHeight: '1.8',
    textAlign: 'center',
  },
  avatar: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '0 auto 1rem',
    display: 'block',
    border: '3px solid #1976d2',
  },
  name: {
    marginBottom: '1rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#1976d2',
  },
  link: {
    color: '#1976d2',
    textDecoration: 'underline',
  },
  linkBox: {
    marginTop: '1.5rem',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    flex: '1',
    padding: '0.6rem',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    minWidth: '250px',
  },
  copyButton: {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  shareButtons: {
    marginTop: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e0e0e0',
    borderRadius: '6px',
    color: '#000',
    fontWeight: '500',
    textDecoration: 'none',
  },
  loading: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem',
  },
};
