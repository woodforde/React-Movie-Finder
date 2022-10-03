import React from 'react';
import Nav from '../components/Nav';
import './Home.css';

function Home() {
    return (
        <div className="home container">
            <Nav black={true} />
            <h1>Australia's most awarded movie searching platform</h1>
            <h2>Find your dream car with <span className="maroon">mindr</span></h2>

            {/* Home search bar */}
        </div>
    );
}

export default Home;