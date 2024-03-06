import React, { useState, useMemo, useEffect } from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import "./Hexagongrid.css";

const HexagonGrid = (props) => {

  const [clickedHex, setClickedHex] = useState(null);

  let tableNumber = props.tableNumber || 2;

  const handleClick = (gridValue) => {
    console.log("gridValue: " + gridValue)
    console.log("props.result: " + props.result)
    if (props.result == gridValue) {
      console.log("oikein");
      setClickedHex(gridValue);
    } else {
      alert("Yritä uudelleen!");
    }
  };    
  
  const getChildTextValue = (children) => {
    if (!children) {
      return "";
    }
    if (typeof children === "string") {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(getChildTextValue).join("");
    }
    if (children.props && children.props.value) {
      return children.props.value;
    }
    return "";
  };  
  
  const GetTableNumbers = (number) => {
    let tableNumbers = [];
    let allowedNumbers = [];
  
    let currentAllowedNumber = 0;
    for (let i = 0; i < 11; i++) {
      allowedNumbers.push(currentAllowedNumber);
      currentAllowedNumber += parseInt(number);
    }
    
    for (let i = 0; i < 40; i++) {
      while(true) {
        let randomNumber = allowedNumbers[RandomBetween(0, allowedNumbers.length)];
        if (AmountOfNumberOccurances(tableNumbers, randomNumber) < 4) {
          tableNumbers.push(randomNumber);
          break;
        }
      }
    }
    return tableNumbers;
  }
  
  const AmountOfNumberOccurances = (numbers, number) => {
    let occurances = 0;
    numbers.forEach(element => {
      if (element == number) {
        occurances++;
      }
    });
    return occurances;
  }
  
  const RandomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const tableNumbers = GetTableNumbers(tableNumber);

  const hex = () => {
    let hex = [];
    let r = 0;
    let h = 0;
    const hexColors = ["yellow", "red", "orange"]; 
    const maxSameColor = 4;
    const hexCounts = new Map(); 
    const randomIndexes = new Set();
    while (randomIndexes.size < 10) {
      randomIndexes.add(Math.floor(Math.random() * 40));
    }
    for (let i = 0; i < 5; i++) {
      let c = 0;
      for (let q = -4; q < 4; q++) {
        let fixedR;
        if (c < 2) {
          fixedR = r;
        } else if (c < 4) {
          fixedR = r - 1;
        } else if (c < 6) {
          fixedR = r - 2;
        } else {
          fixedR = r - 3;
        }
        const hexIndex = i * 8 + q + 4;
        let hexFill;
        const countsExceeded = [...hexCounts].every(([_, count]) => count >= maxSameColor);
        if (countsExceeded) {
          hexFill = hexColors[Math.floor(Math.random() * hexColors.length)];
        } else {
          do {
            hexFill = hexColors[Math.floor(Math.random() * hexColors.length)];
          } while (hexCounts.get(hexFill) >= maxSameColor);
        }
        hexCounts.set(hexFill, (hexCounts.get(hexFill) || 0) + 1);
        const hexStyle = {
          fill: hexFill,
        };
        const blueStyle = {
          fill: "blue",
        };
        if (randomIndexes.has(hexIndex)) {
          hex.push(
            <Hexagon
              q={q}
              r={fixedR}
              s={0}
              id={`${i},${q}`}
              onClick={() => handleClick(document.getElementById(`${i},${q}-value`).innerHTML)}
              key={`${i},${q}`}
              style={hexStyle}
            >
              <Text id={`${i},${q}-value`}>{tableNumbers[h]}</Text>
            </Hexagon>
          );
        } else {
          hex.push(
            <Hexagon
              q={q}
              r={fixedR}
              s={0}
              id={`${i},${q}`}
              onClick={() => handleClick(document.getElementById(`${i},${q}-value`).innerHTML)}
              key={`${i},${q}`}
              style={blueStyle}
            >
              <Text id={`${i},${q}-value`}>{tableNumbers[h]}</Text>
            </Hexagon>
          );
        }
        h++;
        c++;
      }
      r++;
    }
    return hex;
  };
  
  return (
    <div>
      <div className="test">
      <HexGrid width={1200} height={800}>
        <Layout size={{ x: 8, y: 8 }} flat={true} spacing={1.2} origin={{ x: 0, y: 0 }}>
          {hex()}
          </Layout>
      </HexGrid>
      </div>
    </div>
  );
};

export default HexagonGrid;
