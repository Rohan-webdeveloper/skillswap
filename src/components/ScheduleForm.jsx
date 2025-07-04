// src/components/ScheduleForm.jsx
import { useState } from 'react';
import '../styles/ScheduleForm.css';

export default function ScheduleForm({ onSchedule }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && time) {
      onSchedule({ date, time, note });
      setDate('');
      setTime('');
      setNote('');
    }
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Time:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

      <label>Note (optional):</label>
      <textarea
        placeholder="Any message or context..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>

      <button type="submit">Schedule</button>
    </form>
  );
}
