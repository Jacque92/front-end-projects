import React from "react";
import { getRandomColor } from "../utilise";
import { useState, useEffect } from "react";

export const QuoteMachine = () => {
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState({});

  useEffect(async () => {
    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * 1400);

    setQuotes(data);
    setRandomQuote(data[randomIndex]);
    setBgColor(getRandomColor());
  }, []);

  const handleRandom = () => {
    setBgColor(getRandomColor());
    setRandomQuote(quotes[getRandomQuoteIndex()]);
  };

  const getRandomQuoteIndex = () => {
    const randomIndex = Math.floor(Math.random() * 1400);
    return randomIndex;
  };
  return (
    <div
      className="page quoteMachine"
      style={{ backgroundColor: bgColor, color: bgColor }}
    >
      <section className="board">
        <h3>{Object.values(randomQuote)[0]}</h3>
        <p style={{ textAlign: "right" }}>{Object.values(randomQuote)[1]}</p>
        <div className="h_btn_group">
          <div className="btn_group"></div>
          <button
            style={{
              backgroundColor: bgColor,
            }}
            onClick={handleRandom}
          >
            New Quote
          </button>
        </div>
      </section>
    </div>
  );
};
