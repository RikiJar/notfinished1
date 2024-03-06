import React, { useState, useEffect } from "react";
import "./Game1.css";

const Game1 = (props) => {
    const [numPlayers, setNumPlayers] = useState(0);
    const [games, setGames] = useState([]);
      
    useEffect(() => {
      // Simulate data for example purposes
      const data = [
        {
          id: 1,
          name: 'Chess',
          players: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
          ]
        },
        {
          id: 2,
          name: 'Checkers',
          players: [{ id: 3, name: 'Charlie' }]
        },
        {
          id: 3,
          name: 'Go',
          players: [{ id: 4, name: 'David' }]
        }
      ];
  
      setNumPlayers(data.reduce((acc, game) => acc + game.players.length, 0));
      setGames(data);
    }, []);
  
    return (
      <div className="game-lobby">
        <h1 className="title">Game Lobby</h1>
        <p className="num-players">Number of Players: {numPlayers}</p>
        <ul className="game-list">
          {games.map(game => (
            <li className="game-item" key={game.id}>
              <span className="game-name">{game.name}</span>
              <span className="game-players">
                {game.players.map(player => player.name).join(', ')}
              </span>
              <button className="join-btn">Join Game</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default Game1;