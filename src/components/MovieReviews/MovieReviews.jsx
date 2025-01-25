import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/tmdb-api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [movieId]);

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

export default MovieReviews;
