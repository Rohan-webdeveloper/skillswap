// src/components/ReviewList.jsx
import '../styles/ReviewList.css';

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="review-list">
      <h3>User Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="stars">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
