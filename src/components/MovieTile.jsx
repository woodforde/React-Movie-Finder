import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieTile.css';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideocamIcon from '@mui/icons-material/Videocam';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';


function MovieTile({ id, search_state, page_state }) {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchInfo() {
        setLoading(true);
        const { data } = await axios.get(`https://omdbapi.com/?i=${id}&apikey=dba29d20`);
        setInfo([{ ...data }]);
        setLoading(false);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    let navigate = useNavigate();

    return (
        <div
            className="movieTile"
            onClick={ () => !loading && navigate(`/movies/${id}`, {
                    state: {
                        search_state: search_state,
                        page_state: page_state
                    }}) }
        >
            { loading ? (
                <div className="skeleton">
                    <div className="skeletonImage skeletonBackground"></div>
                    <div className="skeletonInformation">
                        <div className="skeletonInformation__title skeletonBackground"></div>
                        <div className="skeletonInformation__feature skeletonBackground"></div>
                        <div className="skeletonInformation__feature skeletonBackground"></div>
                        <div className="skeletonInformation__feature skeletonBackground"></div>
                        <div className="skeletonRating skeletonBackground"></div>
                    </div>
                </div>
            ):(
                <>
                {/* Poster */}
                <div className="moviePoster">
                    <img 
                        className="moviePoster__image"
                        src={(info.length > 0 && info[0].Poster !== "N/A") ? info[0].Poster : process.env.PUBLIC_URL + "/default-image.jpg"} 
                        alt="" 
                    />
                    <div className="moviePoster__overlay">
                        <div className="moviePoster__overlayText">More Info</div>
                        <div className="moviePoster__overlayBackground"></div>
                    </div>
                </div>
                <div className="movieInformation">
                    {/* Title */}
                    <div className="title">
                        <span className="titleSpan">
                            {info.length > 0 && info[0].Title}
                        </span>
                    </div>
                    <ul className="features">
                        {/* Date */}
                        <li className="feature">
                            <CalendarMonthIcon /> {info.length > 0 && info[0].Released}
                        </li>
                        {/* Runtime */}
                        <li className="feature">
                            <AccessTimeIcon /> {info.length > 0 && info[0].Runtime}
                        </li>
                        {/* Genre */}
                        <li className="feature">
                            <VideocamIcon /> {info.length > 0 && info[0].Genre}
                        </li>
                    </ul>
                    {/* Rating */}
                    <h2 className="rating"><StarIcon /> {info.length > 0 && info[0].imdbRating + (info[0].imdbRating !== "N/A" ? "/10" : "")}</h2>
                </div>
                </>
            )}
        </div>
    );
}

export default MovieTile;