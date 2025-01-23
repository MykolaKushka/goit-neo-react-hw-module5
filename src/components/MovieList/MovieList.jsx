import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={styles.movieList}>
      {movies.map(movie => (
        <div key={movie.id} className={styles.movieCard}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.movieImage}
            />
            <h3>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;
