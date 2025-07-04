// src/pages/MatchPage.jsx

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function MatchPage() {
  const { user } = useAuth();
  const [mySkills, setMySkills] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMySkills();
  }, []);

  const fetchMySkills = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('skills')
      .eq('id', user.id)
      .single();

    if (data?.skills) {
      const skillsArr = data.skills
        .split(',')
        .map((s) => s.trim().toLowerCase());
      setMySkills(skillsArr);
      findMatches(skillsArr);
    }
  };

  const findMatches = async (skillsArr) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, skills')
      .neq('id', user.id);

    if (error) {
      console.error('Match fetch error:', error);
    } else {
      const matched = data.filter((u) => {
        const userSkills = u.skills
          ?.split(',')
          .map((s) => s.trim().toLowerCase()) || [];
        return userSkills.some((skill) => skillsArr.includes(skill));
      });
      setMatches(matched);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🤝 Skill Matches</h2>

      {matches.length === 0 ? (
        <p>No skill matches found yet. Try updating your skills!</p>
      ) : (
        <ul style={styles.list}>
          {matches.map((user) => (
            <li key={user.id} style={styles.card}>
              <h3>{user.full_name}</h3>
              <p><strong>Skills:</strong> {user.skills}</p>
              <Link to={`/user/${user.id}`} style={styles.link}>
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      )}
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
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    border: '1px solid #ccc',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    background: '#f9f9f9',
  },
  link: {
    marginTop: '0.5rem',
    display: 'inline-block',
    color: '#0077cc',
    textDecoration: 'underline',
  },
};
