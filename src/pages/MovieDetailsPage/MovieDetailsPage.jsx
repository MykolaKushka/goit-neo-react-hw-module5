import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCast, fetchMovieReviews } from '../../api/tmdb-api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('cast'); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
        const movieCast = await fetchMovieCast(movieId);
        setCast(movieCast);
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (err) {
        setError('Error fetching movie details.');
        console.error('Error:', err);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.goBackButton}>
        Go Back
      </button>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className={styles.moviePoster}
      />
      <p>{movieDetails.overview}</p>

      <div className={styles.additionalInfo}>
        <h2>Additional Information</h2>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab('cast')}
            className={`${styles.tabButton} ${activeTab === 'cast' ? styles.activeTab : ''}`}
          >
            Cast
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
          >
            Reviews
          </button>
        </div>

        {activeTab === 'cast' && <MovieCast cast={cast} />}
        {activeTab === 'reviews' && <MovieReviews reviews={reviews} />}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MovieDetailsPage;
