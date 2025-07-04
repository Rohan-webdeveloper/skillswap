// src/pages/Explore.jsx

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import UserCard from '../components/UserCard';

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [uniqueSkills, setUniqueSkills] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedSkill === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.skills?.toLowerCase().includes(selectedSkill.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [selectedSkill, users]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, skills, experience, availability, portfolio');

    if (data) {
      setUsers(data);
      setFilteredUsers(data);
      const skillsArray = data.flatMap(u => u.skills?.split(',').map(s => s.trim()) || []);
      setUniqueSkills([...new Set(skillsArray)]);
    } else {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Explore Users</h2>

      {/* ✅ Skill Filter Dropdown */}
      <div style={styles.filterBox}>
        <label>Filter by Skill:</label>
        <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
          <option value="">All</option>
          {uniqueSkills.map((skill, index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
  },
  filterBox: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
};
