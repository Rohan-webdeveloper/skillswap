// src/pages/Auth.jsx

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Create Account'}
        </button>

        <p style={styles.toggle}>
          {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
          <span onClick={() => setIsLogin(!isLogin)} style={styles.link}>
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3rem',
  },
  form: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '0.6rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  toggle: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  link: {
    color: '#1976d2',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    backgroundColor: '#ffe6e6',
    padding: '0.5rem',
    color: '#d32f2f',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
};
