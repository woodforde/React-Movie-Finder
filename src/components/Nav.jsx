import React from 'react';
import './Nav.css';

import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

function Nav({ black }) {
    let navigate = useNavigate();

    return (
        <>
        { black ? (
            <div className="nav container">
                <div className="logo">
                    <img
                        className="logo__image"
                        src="https://media-public.canva.com/j6wzE/MAEFr4j6wzE/1/s.svg"
                        alt="" 
                    />
                    <div className="logo__text">mindr</div>
                </div>
                <ul className="links">
                    <li className="link" >
                        <span
                            className="
                                link__anchor
                                link__hover-effect
                                link__hover-effect--black
                            "
                            onClick={() => navigate("/")}
                        >Home</span>
                    </li>
                    <li className="link">
                        <span
                            className="
                                link__anchor
                                link__hover-effect
                                link__hover-effect--black
                            "
                            onClick={() => navigate("/movies")}
                        >Find a movie</span>
                    </li>
                    <li className="link link__primary--black">
                        <Button
                            variant="outlined"
                        >Contact</Button>
                    </li>
                </ul>
            </div>
        ) : (
            <div className="nav container">
                <div className="logo">
                    <img
                        className="logo__image invert"
                        src="https://media-public.canva.com/j6wzE/MAEFr4j6wzE/1/s.svg"
                        alt="" 
                    />
                    <div className="logo__text white">mindr</div>
                </div>
                <ul className="links">
                    <li className="link" >
                        <span
                            className="
                                link__anchor
                                link__hover-effect
                                white
                                link__hover-effect--white
                            "
                            onClick={() => navigate("/")}
                        >Home</span>
                    </li>
                    <li className="link">
                        <span
                            className="
                                link__anchor
                                link__hover-effect
                                white
                                link__hover-effect--white
                            "
                            onClick={() => navigate("/movies", { props: "test" })}
                        >Find a movie</span>
                    </li>
                    <li className="link link__primary--white">
                        <Button
                            variant="outlined"
                        >Contact</Button>
                    </li>
                </ul>
            </div>
        )}
        
        </>
    );
}

export default Nav;