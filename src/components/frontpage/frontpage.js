import React from 'react';
import './FrontPage.css';
import Game1 from '../game1_menu/Game1';
import GameIcons from './gameicons/icons';
import Wheel from '../wheel/Wheel';

import { Routes, Route } from "react-router-dom";
 
const FrontPage = (props) => {
    
    return (
        <div className="Container">
            <Routes>
                <Route path="/" element={<GameIcons />} />
                <Route path="/game1" element={<Game1 />} />
                <Route path="/game2" element={<Wheel />} />
                <Route path="*" element={<GameIcons />} />
            </Routes>
        </div>
    )
}


export default FrontPage;