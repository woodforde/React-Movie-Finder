import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import MovieSearch from './pages/MovieSearch';

function App() {
  return (
    <div className="app">
        <Router>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Movie Search Page */}
            <Route path="/movies" element={<MovieSearch />} />

            {/* Movie Information Page */}
            <Route path="/movies/:id" element={<Movie />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
