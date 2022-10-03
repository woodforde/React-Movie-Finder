import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieTile.css';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideocamIcon from '@mui/icons-material/Videocam';
import StarIcon from '@mui/icons-material/Star';


function MovieTile({ title, poster }) {
    // const [info, setInfo] = useState([]);

    // async function fetchInfo() {
    //     const { data } = await axios.get(`https://omdbapi.com/?i=tt1905041&apikey=dba29d20`);
    //     setInfo([{ ...data }]);
    // }

    // useEffect(() => {
    //     fetchInfo();
    // }, []);

    return (
        <div className="movieTile">
            {/* Poster */}
            <div className="moviePoster">
                <img className="moviePoster__image" src={poster} alt="" />
                <div className="moviePoster__overlay">

                </div>
            </div>
            <div className="movieInformation">
                {/* Title */}
                <h1>{title}</h1>
                <ul className="features">
                    {/* Date */}
                    <li className="feature">
                        <CalendarMonthIcon /> 29 Apr 2011
                    </li>
                    {/* Runtime */}
                    <li className="feature">
                        <AccessTimeIcon /> 120 min
                    </li>
                    {/* Genre */}
                    <li className="feature">
                        <VideocamIcon /> 29 Apr 2011
                    </li>
                </ul>
                {/* Rating */}
                <h2 className="rating"><StarIcon /> 7.9/10</h2>
            </div>
        </div>
    );
}

export default MovieTile;