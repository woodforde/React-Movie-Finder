import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieTile from '../components/MovieTile';
import Nav from '../components/Nav';
import './MovieSearch.css';
import SearchIcon from '@mui/icons-material/Search';
import LoopIcon from '@mui/icons-material/Loop';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useLocation } from 'react-router-dom';

function MovieSearch() {
    const { state } = useLocation();
    const { search_state } = state || { search_state: "" };
    const { page_state } = state || { page_state: 1 };
    const { year_state } = state || { year_state: "2000" };
    const { yearActive_state } = state || { yearActive_state: false };
    
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(search_state);
    const [searchBar, setSearchBar] = useState(search_state);
    const [year, setYear] = useState(year_state);
    const [slider, setSlider] = useState(year_state);
    const [yearActive, setYearActive] = useState(yearActive_state);
    const [page, setPage] = useState(page_state);
    const [pageMax, setPageMax] = useState(0);

    const [loading, setLoading] = useState(false);

    async function fetchMovies() {
        setLoading(true);
        const { data } = await axios.get(
            `https://www.omdbapi.com/?apikey=dba29d20&type=movie&s=${search.toString().replace(' ', '-')}&page=${page.toString()}&y=${yearActive ? year : ""}`
        );
        if (data.Response === "True" && search !== undefined) {
            setMovies(data.Search)
            setPageMax(Math.ceil(parseInt(data.totalResults) / 10));
        } else {
            setMovies([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchMovies();
    }, [yearActive, year, page, search]);

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
                        value={searchBar}
                        placeholder="Type something and start searching!"
                        onChange={(e) => { setSearchBar(e.target.value) }}
                        onKeyDown={(e) => {
                            e.key === "Enter" && setSearch(searchBar);
                            e.key === "Enter" && setPage(1);
                        }}
                    />
                    <button
                        className="searchBar__button"
                        onClick={ () => {
                            setSearch(searchBar);
                            setPage(1);
                        }}
                    ><SearchIcon /></button>
                </div>
            </div>

            {/* Movie Results :  */}
            <div className="searchResults container">
                <div className="searchResults__header">
                    <h1>Search results for: <span className="maroon">"{search}"</span></h1>
                    {/* slide bar */}
                    <div className="yearSlider__container">
                        <div className="yearSlider__checkboxContainer">
                            <h1>Search by Year</h1>
                            <input
                                type="checkbox"
                                className="yearSlider__checkbox"
                                checked={yearActive}
                                onChange={(e) => {
                                    setYearActive(e.target.checked);
                                    setPage(1);
                                    setYear(slider);
                                }}
                            />
                        </div>
                        <div className="yearSlider__sliderContainer">
                            <input
                                type="range"
                                className="yearSlider"
                                min="1895" max={new Date().getFullYear()}
                                value={slider}
                                onChange={(e) => setSlider(e.target.value)}
                                onClick={() => { if (yearActive) {
                                    setPage(1);
                                    setYear(slider);
                                }}}
                            />
                            <h1>{slider}</h1>
                        </div>
                    </div>
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
                                    search_state={search}
                                    page_state={page}
                                    year_state={year}
                                    yearActive_state={yearActive}
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
                )}
                {/* Page Changing */}
                { movies.length > 0 ? (
                    <div className="pageChange">
                        <div
                            className="pageNav"
                            onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1);
                                }
                            }}
                        ><ChevronLeftIcon /></div>
                        <div className="currentPage">{page}</div>
                        <div 
                            className="pageNav"
                            onClick={() => {
                                if (page <= pageMax) {
                                    setPage(page + 1);
                                }
                            }}
                        ><ChevronRightIcon /></div>
                    </div>
                ):(
                        <></>
                )}
            </div>
        </div>           
    )
}

export default MovieSearch;