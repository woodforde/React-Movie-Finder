import React, { useState } from 'react';
import Nav from '../components/Nav';
import './Home.css';

import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    function startSearch() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/movies", {
                    state: {
                        search_state: search,
                        page_state: 1
                    }});
        }, 500)
    }

    return (
        <div className="home container">
            <Nav black={true} />
            <h1>Australia's most awarded movie searching platform</h1>
            <h2>Find any movie with <span className="maroon">mindr</span></h2>

            {/* Home search bar */}
            <div className="homeSearch">
                <input
                    type="text"
                    className="homeSearch__input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className={!loading
                        ? "homeSearch__button"
                        : "homeSearch__buttonLoading"}
                    onClick={startSearch}
                >{!loading ? <SearchIcon /> : <AutorenewIcon />}</button>
            </div>

            {/* Home Image */}
            <img src={process.env.PUBLIC_URL + "/home-image.svg"} alt="" />
        </div>
    );
}

export default Home;