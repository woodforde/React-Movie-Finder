import React, { useEffect, useState } from 'react';
import './Movie.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import axios from 'axios';

function Movie() {
    let { id } = useParams();
    let navigate = useNavigate();

    const { state } = useLocation();
    const { search_state } = state || { search_state: "" };
    const { page_state } = state || { page_state: 1 };

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovie();
    }, []);

    async function fetchMovie() {
        const { data } = await axios.get(`https://omdbapi.com/?apikey=dba29d20&i=${id}`);
        setMovie([{...data}]);
        setLoading(false);
    }

    return (
        <div className="movie container">
            <Nav black={true}/>

            <button
                className="backButton"
                onClick={() => navigate("/movies", {
                        state: {
                            search_state: search_state,
                            page_state: page_state
                        }})}
            ><ArrowBackIcon /> Back</button>
            { loading ? (
                <div className="movieDetail__skeleton">
                    <div className="movieDetail__skeletonPoster skeletonBackground">

                    </div>
                    <div className="movieDetail__skeletonInformation">
                        <div className="movieDetail__skeletonTitle skeletonBackground"></div>
                        <div className="movieDetail__skeletonPlot skeletonBackground"></div>
                        <ul className="moveDetail__skeletonDetails">
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                            <li className="moveDetail__skeletonDetail skeletonBackground"></li>
                        </ul>
                    </div>
                </div>
            ):(
                <div className="movieDetails__container">
                    <div className="movieDetails">
                        <div className="moviePoster">
                            <img src={movie[0].Poster === "N/A" ? process.env.PUBLIC_URL + "/default-image.jpg" : movie[0].Poster} alt="" />
                        </div>
                        <div className="movieInformation__container">
                            <h1>{movie[0].Title}</h1>
                            <p>{movie[0].Plot}</p>
                            <ul className="detailList">
                                <li className="detail">
                                    <b>Director:</b> {movie[0].Director}
                                </li>
                                <li className="detail">
                                    <b>Actors:</b> {movie[0].Actors}
                                </li>
                                <li className="detail">
                                    <b>Writers:</b> {movie[0].Writer}
                                </li>
                                <li className="detail">
                                    <b>Release Date:</b> {movie[0].Released}
                                </li>
                                <li className="detail">
                                    <b>Rated:</b> {movie[0].Rated}
                                </li>
                                <li className="detail">
                                    <b>Runtime:</b> {movie[0].Runtime}
                                </li>
                                <li className="detail">
                                    <b>Genre:</b> {movie[0].Genre}
                                </li>
                                <li className="detail">
                                    <b>Box-Office:</b> {movie[0].BoxOffice}
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                    <div className="movieDetails__ratings">
                        { movie.length > 0 && movie[0].Ratings.map((rating) => (
                            <div key={rating.Source} className="ratingBubble dot">
                                <h2>{rating.Source}</h2>
                                <h2>{rating.Value}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            

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