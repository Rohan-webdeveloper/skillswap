// src/components/ReviewForm.jsx
import { useState } from 'react';
import '../styles/ReviewForm.css';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && comment.trim()) {
      onSubmit({ rating, comment });
      setRating(0);
      setComment('');
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <label>Rating:</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'filled' : ''}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <label>Comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
      ></textarea>

      <button type="submit">Submit Review</button>
    </form>
  );
}
