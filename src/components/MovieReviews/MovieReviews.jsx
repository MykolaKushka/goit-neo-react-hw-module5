import PropTypes from 'prop-types';
import styles from './MovieReviews.module.css';

const MovieReviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className={styles.review}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default MovieReviews;
