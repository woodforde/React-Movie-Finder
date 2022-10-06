import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieTile from '../components/MovieTile';
import Nav from '../components/Nav';
import './MovieSearch.css';
import SearchIcon from '@mui/icons-material/Search';
import LoopIcon from '@mui/icons-material/Loop';
import { useLocation } from 'react-router-dom';

function MovieSearch() {
    const { state } = useLocation();
    const { search_state } = state || { search_state: "" };
    
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(search_state);
    const [searchBar, setSearchBar] = useState(search_state);
    const [loading, setLoading] = useState(false);

    async function fetchMovies() {
        setSearchBar(search)
        setLoading(true);
        const { data } = await axios.get(`https://www.omdbapi.com/?s=${search.toString().replace(' ', '-')}&type=movie&apikey=dba29d20`);
        if (data.Response === "True" && search !== undefined) {
            setMovies(data.Search)
        } else {
            setMovies([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className='movieSearch'>
            <div className="header">
                <div className="headerBackground">
                    <img
                        className="headerBackground__image"
                        src="https://cdn.shopify.com/s/files/1/0591/4882/8877/files/curtain-269920_54e49847-dbc2-42cb-9982-7568d72534bd_1280x@2x.jpg?v=1629866798"
                        alt=""
                    />
                </div>
                <Nav black={false} />
                <h1 className="headerTitle">Browse Movies</h1>
                {/* Search Bar */}
                <div className="searchBar">
                    <input
                        className="searchBar__input" 
                        type="text"
                        value={search}
                        placeholder="Type something and start searching!"
                        onChange={(e) => { setSearch(e.target.value) }}
                        onKeyDown={(e) => { e.key === "Enter" && fetchMovies() }}
                    />
                    <button
                        className="searchBar__button"
                        onClick={ () => fetchMovies() }
                    ><SearchIcon /></button>
                </div>

            </div>

            {/* Movie Results :  */}
            <div className="searchResults container">
                <div className="searchResults__header">
                    <h1>Search results for: <span className="maroon">"{searchBar}"</span></h1>
                    {/* slide bar */}
                </div>
                { loading ? (
                    <div className="loadingIcon"><LoopIcon /></div>
                ):(
                    movies.length > 0 ? (
                        <div className="searchResults__container">
                            { movies.map((movie) => (
                                <MovieTile 
                                    key={movie.imdbID}
                                    id={movie.imdbID}
                                    search_state={searchBar}
                                />
                            ))}
                        </div>
                    ):(
                        <div className="movies__noResult">
                            <img src={process.env.PUBLIC_URL + "/no-results.svg"} alt="" />
                            <h1>Could not access any movies matching your search</h1>
                            <p>This can happen because your search is too broad, or no movie matching is found. Try changing up your inputs!</p>
                        </div>
                    )
                    
                ) }
            
            </div>
        </div>           
    )
}

export default MovieSearch;