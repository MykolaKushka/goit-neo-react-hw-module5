import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('query') || '';  // Отримуємо query параметр з URL
    setQuery(searchQuery);  // Оновлюємо стан для search input

    if (searchQuery) {
      const fetchMovies = async () => {
        try {
          const results = await searchMovies(searchQuery);
          setMovies(results);
          setError('');
        } catch (err) {
          setError('Something went wrong. Please try again.');
          console.error('Error searching movies:', err);
        }
      };
      fetchMovies();
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query: query });
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
