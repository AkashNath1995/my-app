import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './App.css';
import MovieCard from './components/MovieCard';
import GenreList from './components/GenreList';
import MovieModal from './components/MovieModal';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { SiLinkedin } from 'react-icons/si';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcR6ERZ9JfFCKVpql5Q5iG_lNCGw9v15c",
  authDomain: "happy-hour-movie-booking.firebaseapp.com",
  projectId: "happy-hour-movie-booking",
  storageBucket: "happy-hour-movie-booking.appspot.com",
  messagingSenderId: "431283345802",
  appId: "1:431283345802:web:f896933329bfc4ffa39073",
  measurementId: "G-PGZK6NCY6Y"
};

initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  const apiKey = '5cffd780f1e1d2c34e3d6a3b85e2bfeb';
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
      console.log('Fetched movies:', data.results); 
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
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(genre.id)
      );
    }
    setFilteredMovies(filtered);
  };

  const handleMovieSelect = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=videos`
    );
    const data = await response.json();
    let seatMap = [
      [0, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [1, 0, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 0, 1, 0]
    ];
    data.seats = seatMap;
    setSelectedMovie(data);
  };

  const handleMovieClick = (movie) => {
    if (user) {
      handleMovieSelect(movie);
    } else {
      alert('Please login to view movie details.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Logout successful
      console.log('User logged out');
    } catch (error) {
      // Logout failed
      console.error(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      // Account deletion successful
      console.log('User account deleted');
    } catch (error) {
      // Account deletion failed
      console.error(error.message);
    }
  };

  function handleSortOrderChange(e) {
    const sortOrder = e.target.value;
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (sortOrder === 'highToLow') {
        return b.vote_average - a.vote_average;
      } else if (sortOrder === 'lowToHigh') {
        return a.vote_average - b.vote_average;
      } else if (sortOrder === 'newToOld') {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortOrder === 'oldToNew') {
        return new Date(a.release_date) - new Date(b.release_date);
      }
    });
    setFilteredMovies(sortedMovies);
  }
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
  let filtered = movies;
  if (searchQuery.trim() !== '') {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
  }
  setFilteredMovies(filtered);
};


  return (
    <div className="App">
      <nav className="navbar">
      <Link to="/" className="logo" onClick={() => window.location.reload()}>
         Happy Hour Movie App
      </Link>
        {user ? (
          <div  className='log-container'>
            <button className="logout-home" onClick={handleLogout}>
              Logout
            </button>
           
          </div>
        ) : (
          <Link className="login-home" to="/login">
            Login
          </Link>
        )}
      </nav>
      <div className="search-bar">
            <input
              type="text"
              placeholder="Search by movie name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-bar-btn"onClick={handleSearch}>Search</button>
          </div>

      <div className="container">
        <div className="genres">
          <h2>Genres</h2>
          <GenreList genres={genres} handleGenreSelect={handleGenreSelect} />
        </div>
        <div className="movies">
          <h2>Now Playing</h2>
          <div className="sort-dropdown">
            <label htmlFor="sort-order">Sorting:</label>
            <select id="sort-order" onChange={handleSortOrderChange}>
              <option value="choose" disabled selected hidden >Choose a option</option>
              <option value="highToLow">Rating: High to Low</option>
              <option value="lowToHigh">Rating: Low to High</option>
              <option value="newToOld">Release Date: New to Old</option>
              <option value="oldToNew">Release Date: Old to New</option>
            </select>

          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {filteredMovies.length > 0 ? (
                <div className="movie-grid">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      handleMovieClick={handleMovieClick}
                    />
                  ))}
                </div>
              ) : (
                <p>No movies found.</p>
              )}
            </>
          )}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} handleCloseModal={handleCloseModal} />
      )}

      <footer className='footer'>
        <div className="footer-icons">
          <FaFacebookF className="icon" />
          <AiOutlineInstagram className="icon" />
          <AiFillTwitterCircle className="icon" />
          <SiLinkedin className="icon" />
        </div>
        <p className='footer-para'>&copy; 2023 Movie App. All rights reserved.</p>
        {user ? (
          <div  className='log-container'>
            <button className="delete-home" onClick={handleDeleteAccount}>
              Delete Account
            </button>
           
          </div>
        ) : (
          <Link className="login-home" to="/login">
            Login
          </Link>
        )}
        

      </footer>
    </div>
  );
}

export default App;
