import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import ProfileProgress from '../components/ProfileProgress';

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    bio: '',
    skills: '',
    experience: '',
    portfolio: '',
    availability: 'Available',
    profile_image: '', // ✅ using your actual DB column
  });

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setForm({
        full_name: data.full_name || '',
        bio: data.bio || '',
        skills: data.skills || '',
        experience: data.experience || '',
        portfolio: data.portfolio || '',
        availability: data.availability || 'Available',
        profile_image: data.profile_image || '',
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);

      setForm({ ...form, profile_image: publicUrl.publicUrl });
    } catch (err) {
      alert('❌ Upload failed');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updates = {
      id: user.id,
      ...form,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) alert('❌ Error saving profile');
    else alert('✅ Profile saved!');
    setLoading(false);
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>
      <ProfileProgress profile={form} />

      {form.profile_image && (
        <img
          src={form.profile_image}
          alt="Profile"
          style={styles.avatar}
        />
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          style={styles.fileInput}
        />

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={form.bio}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="portfolio"
          placeholder="Portfolio URL"
          value={form.portfolio}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Available">✅ Available</option>
          <option value="Busy">⛔ Busy</option>
        </select>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  avatar: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '1rem auto',
    border: '3px solid #1976d2',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    height: '100px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  fileInput: {
    padding: '10px',
    fontSize: '14px',
  },
  button: {
    background: '#1976d2',
    color: '#fff',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
  },
};
