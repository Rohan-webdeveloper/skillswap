// src/components/SkillSelector.jsx
import '../styles/SkillSelector.css';

export default function SkillSelector({ skills, selectedSkills, onChange, label }) {
  const handleToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="skill-selector">
      <h3>{label}</h3>
      <div className="skill-list">
        {skills.map((skill) => (
          <button
            key={skill}
            className={`skill-button ${selectedSkills.includes(skill) ? 'selected' : ''}`}
            onClick={() => handleToggle(skill)}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
}
