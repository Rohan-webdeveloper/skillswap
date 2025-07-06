// src/components/ReviewForm.jsx

import { useState } from 'react';
import '../styles/ReviewForm.css';

export default function ReviewForm({ onSubmit, initialRating = 0, initialComment = '' }) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(initialComment);

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
      <label className="review-label">Your Rating:</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= (hoverRating || rating) ? 'star filled' : 'star'}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>

      <label className="review-label">Comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a helpful review..."
        rows={4}
        required
      />

      <button type="submit" className="submit-btn">Submit Review</button>
    </form>
  );
}
