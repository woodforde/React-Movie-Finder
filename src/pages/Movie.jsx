import React, { useEffect, useState } from 'react';
import './Movie.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import axios from 'axios';

function Movie() {
    let { id } = useParams();
    let navigate = useNavigate();

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchMovie();
    }, []);

    async function fetchMovie() {
        const { data } = await axios.get(`https://omdbapi.com/?apikey=dba29d20&i=${id}`);
        setMovie([{...data}]);
    }

    return (
        <div className="movie container">
            <Nav black={true}/>

            <button
                className="backButton"
                onClick={() => navigate("/movies")}
            ><ArrowBackIcon /> Back</button>

            <div className="movieDetails">
                <div className="moviePoster">
                    <img src="https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg" alt="" />
                </div>
                <div className="movieInformation__container">
                    <h1 className="movieInformation__title">{movie[0].Title}</h1>
                    <p className="movieInformation__plot">{movie[0].Plot}</p>
                    { movie.length > 0 && movie[0].Ratings.map((rating) => (
                        <h2 key={rating.Source}>{rating.Source}: {rating.Value}</h2>
                    ))}
                </div>
            </div>

            {/* Poster */}
            {/* Title */}
            {/* Plot */}
            {/* Director */}
            {/* Actors */}
            {/* Ratings */}
        </div>
    );
}

export default Movie;