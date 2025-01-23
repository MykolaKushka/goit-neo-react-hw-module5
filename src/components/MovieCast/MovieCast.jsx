import PropTypes from 'prop-types';
import styles from './MovieCast.module.css';

const MovieCast = ({ cast }) => {
  const placeholderImage = 'https://placehold.co/100x150'; 

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

MovieCast.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default MovieCast;
