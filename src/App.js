import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import GenreList from './components/GenreList';
import MovieModal from './components/MovieModal';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { SiLinkedin } from 'react-icons/si';



function App() {
  const apiKey = '5cffd780f1e1d2c34e3d6a3b85e2bfeb';
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadingImg = './loading.gif';
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
      setFilteredMovies(data.results);
      setLoading(false);
    };

    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchNowPlayingMovies();
    fetchGenres();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    let filtered = movies;
    if (genre) {
      filtered = filtered.filter((movie) => movie.genre_ids.includes(genre.id));
    }
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (movie) => movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    setFilteredMovies(filtered);
  };

  const handleMovieSelect = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=videos`
    );
    const data = await response.json();
    let seatMap=[[0,1,1,1,1],[0,1,0,1,0],[1,0,1,1,0],[1,1,1,1,0],[1,0,0,1,0],[1,1,1,1,1],[1,0,0,1,0],[0,1,0,1,0],[1,1,1,1,1],[1,1,1,1,0],[0,0,0,0,0],[1,0,1,1,0],[0,1,0,1,0],[1,1,1,0,0],[0,0,1,1,0],[0,0,0,1,0],[0,0,0,0,0],[1,1,0,1,0],[1,1,1,0,0]];
    data.seats=seatMap;
    setSelectedMovie(data);
  };
  const handleMovieClick = (movie) => {
    console.log(movie);
    
    handleMovieSelect(movie);
    console.log(movie)
  };

  return (
    <div className='App'>
      <nav>
        <div className='logo'>
          <a href='/'>Happy Hour Movie</a>
        </div>
      </nav>
      <div className="container">
        <div className="genres">
          <h2>Genres</h2>
          <GenreList genres={genres} handleGenreSelect={handleGenreSelect} />
        </div>
        <div className="movies">
  <h2>Now Playing</h2><br/>
  {loading ? (
    <div className="loading">
      <img src={loadingImg} alt="Loading" />
    </div>
  ) : (
    <>
      {selectedGenre 
        ? filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} handleMovieClick={handleMovieClick} />
          ))
        : movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} handleMovieClick={handleMovieClick} />
          ))
      }
    </>
  )}
</div>

        {selectedMovie && <MovieModal movie={selectedMovie} handleClose={handleCloseModal} />}
      </div>
      <footer>
  <div className="footer-content">
    <div className="footer-info">
      <p>© 2023 Your App. All rights reserved.</p>
      <p>Contact: example@example.com</p>
      <p>Address: 123 Main St, City, Country</p>
    </div>
    <div className="social-icons">
      <a href="https://www.facebook.com">
        <FaFacebookF />
      </a>
      <a href="https://www.instagram.com">
        <AiOutlineInstagram />
      </a>
      <a href="https://www.twitter.com">
        <AiFillTwitterCircle />
      </a>
      <a href="https://www.linkedin.com">
        <SiLinkedin />
      </a>
    </div>
    <div className="additional-info">
      <p>Privacy Policy</p>
      <p>Terms of Service</p>
    </div>
  </div>
</footer>

    </div>

  );
}
export default App;
