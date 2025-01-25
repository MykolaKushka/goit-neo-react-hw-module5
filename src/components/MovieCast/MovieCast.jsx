import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/tmdb-api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  // Placeholder image, якщо профіль актора відсутній
  const placeholderImage = 'https://placehold.co/100x150'; 

  useEffect(() => {
    const fetchCast = async () => {
      const castData = await fetchMovieCast(movieId);
      setCast(castData);
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id} className={styles.actor}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : placeholderImage}
              alt={actor.name}
              className={styles.actorImage}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
