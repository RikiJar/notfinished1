import React, { useState } from "react";
import "./Board.css";
import Dice from "../dice/Dice";
import { useEffect } from "react";

const Board = (props) => {
  const [currentPlayerStringPosition, setCurrentPlayerStringPosition] = useState("0,0");
  const [randomValue, setRandomValue] = useState(null);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  let [lobbyData, setlobbyData] = useState(null); // lobbyData[0].gameData[0].playerId, etc
  const [animating, setAnimating] = useState(false);

  const pathCoordinates = [
    "0,0",
    "0,1",
    "0,2",
    "0,3",
    "0,4",
    "0,5",
    "0,6",
    "0,7",
    "0,8",
    "0,9",
    "1,9",
    "2,9",
    "3,9",
    "4,9",
    "4,8",
    "4,7",
    "4,6",
    "3,6",
    "2,6",
    "2,5",
    "2,4",
    "2,3",
    "2,2",
    "2,1",
    "2,0",
    "3,0",
    "4,0",
    "4,1",
    "4,2",
    "4,3",
    "4,4",
    "5,4",
    "6,4",
    "6,5",
    "6,6",
    "6,7",
    "6,8",
    "6,9",
    "7,9", //39
    "8,9",
    "8,8",
    "8,7",
    "8,6",
    "8,5",
    "8,4",
    "8,3",
  ];

  //let currentPlayer = 1; // 1 or 2

  const CellType = {
    Start: 0,
    Sum: 1,
    PositionReverter: 2,
    Activity: 3,
    Finish: 4
  }
  
  const getTable = (width, height) => {
    const rows = [];
    for (let y = 0; y < height; y++) {
      const cells = [];
  
      for (let x = 0; x < width; x++) {
        const cellId = `${y},${x}`;
        cells.push(<td key={cellId} id={cellId}></td>);
      }
  
      rows.push(<tr key={y}>{cells}</tr>);
    }
  
    const table = (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
    // getPathToTable(pathCoordinates);
    // setPlayerPositionVisually(currentPlayerStringPosition);

    setTimeout(() => { // ÄLÄ POISTA MUUTEN HAJOO KOKO ROSKA
      getPathToTable(pathCoordinates);
      setPlayerPositionVisually(currentPlayerStringPosition);
    }, 0);
    return table;
  }

  const getPathToTable = (pathCoordinates) => {
    pathCoordinates.forEach((coordinate) => {
      const cell = document.getElementById(coordinate);
      switch(coordinate) {
        case "0,0":
        case "8,3":
          cell.style.border = "2px solid #ccc";
          cell.style.backgroundColor = "orange";
          cell.style.borderRadius = '15%';
          cell.innerHTML = "Läh-tö";
          cell.style.fontSize = "1.5em";
          cell.style.color = "white";  
          if(coordinate == "8,3"){
            cell.innerHTML = "MAA-LI";
          }  
          break;

        case "0,9":
        case "2,6":
        case "4,0":
        case "6,7":
        case "8,7":
          cell.style.border = "2px solid #ccc";
          cell.style.backgroundColor = "green";
          cell.style.borderRadius = '15%';
          cell.innerHTML = "Kul-je ta-sa-pai-nora-ta";
          cell.style.fontSize = "0.9em";
          cell.style.color = "white";
          break;

        case "4,7":
        case "4,2":
        case "6,6":
        case "8,6":
          cell.style.border = "2px solid #ccc";
          cell.style.borderRadius = '15%';
          cell.innerHTML = "Kul-je ta-sa-pai-nora-ta";
          cell.style.fontSize = "0.9em";
          cell.style.color = "white";
          cell.innerHTML = "Me-ne <br>taak-se-päin";
          cell.style.backgroundImage = "linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )";
          break;

      default:
        // cell.style.border = "2px solid #ccc";
        // cell.style.backgroundColor = "#8B8000";
        cell.style.borderRadius = '15%';
        cell.style.fontSize = "1em";
        cell.style.color = "white";
        cell.style.backgroundImage = "linear-gradient( 288deg,  rgba(0,85,255,1) 1.5%, rgba(4,56,115,1) 91.6% )";       
      }
    });
  }

  const setPlayerPositionVisually = (currentPlayerStringPosition) => {
      let y = currentPlayerStringPosition.split(',')[0];
      let x = currentPlayerStringPosition.split(',')[1];
      const table = document.querySelector('table');
      const player = document.querySelectorAll('.player')[0] || document.createElement('div');
      player.classList.add('player');
      table.rows[y].cells[x].appendChild(player);
  }

  const getTableCellByStringPosition = (table, stringPosition) => {
    let y = stringPosition.split(',')[0];
    let x = stringPosition.split(',')[1];
    return table.rows[y].cells[x];
  }

  const getPathIndexByStringPosition = (stringPosition) => {
    for (let i = 0; i < pathCoordinates.length; i++) {
      if (pathCoordinates[i] == stringPosition) {
        return i;
      }
    }
    return -1;
  }

  const randomNext = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const goBackToSumCell = (_currentPathIndex) => {
    let randomBackwardsMovement = randomNext(1, 5);
    setCurrentPathIndex(_currentPathIndex - randomBackwardsMovement);
    setCurrentPlayerStringPosition(pathCoordinates[currentPathIndex]);
    const table = document.querySelector('table');
    const player = document.querySelector('.player');
    let nextTableCell = getTableCellByStringPosition(table, currentPlayerStringPosition);
    nextTableCell.appendChild(player);
  }

  const getCellType = (stringPosition) => {
    switch(stringPosition) {
      case "0,0":
        return CellType.Start;
      case "0,9":
      case "2,6":
      case "4,0":
      case "6,7":
      case "8,7":
        return CellType.Activity;
      case "4,7":
      case "4,2":
      case "6,6":
      case "8,6":
        return CellType.PositionReverter;
      case "8,3":
        return CellType.Finish;
      default:
        return CellType.Sum;
    }
  }

  let firstCall = true;
  let movesMade = 0;
  const movePlayer = (currentPathIndex, randomValue, whichPlayer) => {
    const table = document.querySelector('table');
    const player = document.querySelector('.player');

    let currentPosition = pathCoordinates[currentPathIndex];
    let nextPosition; 
    try {
      nextPosition = pathCoordinates[currentPathIndex + 1];
    } catch (err) {
      console.log("Reached the end of the path!");
      currentPosition = pathCoordinates[pathCoordinates.length - 1];
      nextPosition = "";
    }

    console.log("movesMade: " + movesMade);
    if (nextPosition != "" && movesMade < randomValue) {
      if (firstCall) {
        console.log(lobbyData);
        const newGameData = JSON.parse(lobbyData[0].gameData);
        newGameData[0].playerPosition = "0,9"; // Calculate the new position string here
        lobbyData[0].gameData = JSON.stringify(newGameData);
        fetch('/boardData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lobbyData[0])
        })
        .then((result) => {
          if (result.status != 200) {
            console.log("setInterval: Error: " + result.status);
          }
          return result.json();
        });

        firstCall = false;
      }

      setAnimating(true);
      setTimeout(() => {
        // let nextTableCell = getTableCellByStringPosition(table, nextPosition);
        // nextTableCell.appendChild(player);
        movesMade++;
        movePlayer(currentPathIndex + 1, randomValue);
      }, 1000);
    } else {
      movesMade = 0;

      setCurrentPathIndex(currentPathIndex);
      setCurrentPlayerStringPosition(currentPosition);

      let cellType = getCellType(currentPosition);
      switch (cellType) { // Handle cell functionality
        case 2: // PositionReverter
          goBackToSumCell(currentPathIndex);
          break;
        case 4: // Finish
          alert("Voitit pelin!");
          break;
      }
    }

    if (animating) {
      setAnimating(false);
    }
    firstCall = true;
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!animating) {
        // console.log("setInterval: lobbyData:");
        // console.log(lobbyData);
        fetch('/boardData', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        })
        .then(result => {
          if (result.status != 200) {
            console.log("setInterval: Error: " + result.status);
          }
          return result.json();
        })
        .then(json => {
          // console.log("_lobbyData[0].gameData[0].playerId: " + _lobbyData[0].gameData[0].playerId);
          // console.log("_lobbyData[0].gameData[0].playerPosition: " + _lobbyData[0].gameData.playerPosition);
          setlobbyData(json);
          // console.log("lobbyData:");
          // console.log(lobbyData);

          const table = document.querySelector('table');
          const player = document.querySelector('.player');
          const gameData = JSON.parse(json[0].gameData);
          let nextTableCell = getTableCellByStringPosition(table, gameData[0].playerPosition);
          nextTableCell.appendChild(player);
          setCurrentPathIndex(getPathIndexByStringPosition(gameData[0].playerPosition));
          setCurrentPlayerStringPosition(gameData[0].playerPosition);
        });
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);
  
  useEffect (() => {
    setTimeout(() => {
      console.log("Dice: lobbyData:");
      console.log(lobbyData);
      movePlayer(currentPathIndex, randomValue);
    }, 2000);
  }, [randomValue])

  return (
    <div className="container">
      <div className="gameboard">
        {getTable(10, 9)}
        <Dice setRandom={setRandomValue}/>
      </div>
    </div>
  );
};


export default Board;