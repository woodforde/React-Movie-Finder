import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieTile from '../components/MovieTile';
import Nav from '../components/Nav';
import './MovieSearch.css';

function MovieSearch() {
    const API_KEY = process.env.API_KEY;

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("fast");

    async function fetchMovies() {
        console.log(API_KEY);
        const { data } = await axios.get(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=dba29d20`);
        setMovies(data.Search);
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
            </div>

            {/* Movie Results :  */}
            <div className="searchResults container">
                <h1>Search results for: <span className="maroon">"{search}"</span></h1>
                <div className="searchResults__container">
                    <MovieTile poster={"https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"} title={"Fast & Furious 6"} />
                    <MovieTile poster={"https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"} title={"Fast & Furious 6"} />
                    <MovieTile poster={"https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"} title={"Fast & Furious 6"} />
                    <MovieTile poster={"https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"} title={"Fast & Furious 6"} />
                    <MovieTile poster={"https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"} title={"Fast & Furious 6"} />
                </div>

            </div>
        </div>           
    )
}

export default MovieSearch;