import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdb-api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movieRef = useRef(location.state?.from || '/movies'); 
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
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
      <button onClick={() => navigate(movieRef.current)} className={styles.goBackButton}>
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
        <Outlet />
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MovieDetailsPage;
