import React, { useEffect, useRef, useState } from "react";
import "./Wheel.css";
import marker from "./marker.png";
import wheelPNG from "./wheel.png";
import button from "./button.png";
import HexagonGrid from "../hexagon/Hexagongrid";

const Wheel = (props) => {
  let wheelRef = useRef(null);
  let displayRef = useRef(null);
  let startButtonRef = useRef(null);
  let h1Ref = useRef(null);

  let deg = 0;
  let zoneSize = 36;
  const [result, setResult] = useState(null);
  const [tableNumber, setTableNumber] = useState('');

  const symbolSlices = {
    1: "0",
    2: "9",
    3: "8",
    4: "7",
    5: "6",
    6: "5",
    7: "4",
    8: "3",
    9: "2",
    10: "1",
  }

  const HandleButtonClick = (event) => {
    const clickedValue = event.target.innerText;
    if(clickedValue === '10') {
      const h1Element = document.querySelector('.wheelContainer h1');
      h1Element.style.left = '21.2%';
    } else {
      const h1Element = document.querySelector('.wheelContainer h1');
      h1Element.style.left = '22.4%';
    }
    setTableNumber(clickedValue);
  }

  const handleSlice = (actualDeg) => {
    const sliceSymbolNr = Math.ceil(actualDeg / zoneSize);
    if (displayRef.current) {
      displayRef.current.innerHTML = symbolSlices[sliceSymbolNr] + "*" + tableNumber;
      setResult(symbolSlices[sliceSymbolNr] * tableNumber);
    }
  }

  const handleClick = () => {
    if (displayRef.current) {
      startButtonRef.current.removeEventListener('click', handleClick);
      displayRef.current.innerHTML = "Pyöritään";
      startButtonRef.current.style.pointerEvents = 'none';
      deg = Math.floor(5000 + Math.random() * 5000);
      wheelRef.current.style.transition = 'all 2s ease-out';
      wheelRef.current.style.transform = `rotate(${deg}deg)`;
      wheelRef.current.classList.add('blur');
      h1Ref.current.style.display = 'none';
      wheelSpin();
    }
  }

  const wheelSpin = () => {
    wheelRef.current.addEventListener('transitionend', () => {
      wheelRef.current.classList.remove('blur');
      startButtonRef.current.style.pointerEvents = 'auto';
      wheelRef.current.style.transition = 'none';
      const actualDeg = deg % 360;
      wheelRef.current.style.transform = `rotate(${actualDeg}deg)`;
      handleSlice(actualDeg);
      startButtonRef.current.addEventListener('click', handleClick);
      h1Ref.current.style.display = 'block';
    });
  }

  useEffect(() => {
    if (startButtonRef.current) {
      startButtonRef.current.addEventListener('click', handleClick);
    }
  }, [result, tableNumber]);

  return (
      <div className="container">
        <div className="buttons">
          <button onClick={HandleButtonClick}>2</button>
          <button onClick={HandleButtonClick}>3</button>
          <button onClick={HandleButtonClick}>4</button>
          <button onClick={HandleButtonClick}>5</button>
          <button onClick={HandleButtonClick}>6</button>
          <button onClick={HandleButtonClick}>7</button>
          <button onClick={HandleButtonClick}>8</button>
          <button onClick={HandleButtonClick}>9</button>
          <button onClick={HandleButtonClick}>10</button>
        </div>
        <div className="app">
          <div>
            <img src={marker} className="marker"/>
          </div>
          <div className="wheelContainer">
            <img src={wheelPNG} alt="wheel" className="wheel" ref={wheelRef} />
            <h1 ref={h1Ref}>{tableNumber}</h1>
          </div>
          <div>
            <img src={button} alt="button" className="button" ref={startButtonRef} />
          </div>
          <div className="activities">
            <div><span class="dot"></span>Punnerra</div>
            <div><span class="dot2"></span>Kinkkaa</div>
            <div><span class="dot3"></span>tasahypi</div>
          </div>
          <div className="display" ref={displayRef}></div>
        </div>
        <div className="hexagonArea">
          <HexagonGrid result={result} tableNumber={tableNumber}/>
        </div>
      </div>
  );
}

export default Wheel;
