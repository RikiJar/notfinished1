import React, { useState, useEffect } from "react";
import "./Dice.css";

const Dice = (props) => {
  const [dice, setDice] = useState(null);

  useEffect(() => {
    setDice(document.querySelector(".dice"));
  }, []);

  const randomDice = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    rollDice(random);
    props.setRandom(random);
  };

  const rollDice = (random, callback) => {
    dice.style.animation = "rolling 2s";

    setTimeout(() => {
      switch (random) {
        case 1:
          dice.style.transform = "rotateX(0deg) rotateY(0deg)";
          break;

        case 6:
          dice.style.transform = "rotateX(180deg) rotateY(0deg)";
          break;

        case 2:
          dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
          break;

        case 5:
          dice.style.transform = "rotateX(90deg) rotateY(0deg)";
          break;

        case 3:
          dice.style.transform = "rotateX(0deg) rotateY(90deg)";
          break;

        case 4:
          dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
          break;

        default:
          break;
      }

      dice.style.animation = "none";

      if (callback) {
        callback();
      }
    }, 2100);
  };
  return (
    <div className="dice" onClick={randomDice}>
      <div className="face front"></div>
      <div className="face back"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
      <div className="face right"></div>
      <div className="face left"></div>
    </div>
  );
};

export default Dice;
