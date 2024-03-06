import React from "react";
import { Link } from "react-router-dom";
import image1 from '../frontpage_images/1.png';
import image2 from '../frontpage_images/2.png';
import './icons.css';

const GameIcons = (props) => {

    return (
        <div className="Container">
            <div className="Header">
            <h1>Valitse peli</h1>
                </div>
            <div className="GameIcons">
                <Link to="/game1">
                    <div className="GameLobbyItem">
                        <img src={image1} alt="Kuva1"/>
                    </div>
                </Link>
                <Link to="/game2">
                    <div className="GameLobbyItem2">
                            <img src={image2} alt="Kuva2"/>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default GameIcons;