import React from "react";
import { getRandomColor } from "../utilise";
import { useState, useEffect } from "react";

export const QuoteMachine = () => {
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState({});
  function checkCashRegister(price, cash, cid) {
    const currencyUnit_new = {
      PENNY: 1,
      NICKEL: 5,
      DIME: 10,
      QUARTER: 25,
      ONE: 100,
      FIVE: 500,
      TEN: 1000,
      TWENTY: 2000,
      "ONE HUNDRED": 10000,
    };
    let cid_new = [];
    for (let i = 0; i < cid.length; i++) {
      cid_new.push([cid[i][0], (cid[i][1] * 100).toFixed(0)]);
    }
    const difference_new = (cash - price) * 100;
    let length = 0;
    let change = [];
    let status = "OPEN";

    getChange(difference_new, cid_new);

    function getChange(amount, arr) {
      length = arr.length;
      if (amount > 0 && length > 0) {
        let currencyName = arr[arr.length - 1][0];
        if (
          amount > currencyUnit_new[currencyName] &&
          arr[arr.length - 1][1] !== "0"
        ) {
          if (amount > arr[arr.length - 1][1]) {
            change.push([currencyName, arr[arr.length - 1][1] / 100]);
            getChange(
              amount - arr[arr.length - 1][1],
              arr.slice(0, length - 1)
            );
          } else if (amount == arr[arr.length - 1][1]) {
            change.push([currencyName, arr[arr.length - 1][1] / 100]);

            if (arr.slice(0, length - 1).length !== 0) {
              status = "OPEN";
            } else {
              status = "CLOSE";
              change = cid;
            }
          } else {
            let getSome =
              Math.floor(amount / currencyUnit_new[currencyName]) *
              currencyUnit_new[currencyName];
            change.push([currencyName, getSome / 100]);
            getChange(amount - getSome, arr.slice(0, length - 1));
          }
        } else if (amount === currencyUnit_new[currencyName]) {
          change.push([currencyName, amount / 100]);
          if (
            arr[arr.length - 1][1] - amount !== 0 ||
            arr.slice(0, length - 1).length !== 0
          ) {
            status = "OPEN";
          } else {
            status = "CLOSE";
            change = cid;
          }
        } else {
          getChange(amount, arr.slice(0, length - 1));
        }
      } else if (amount > 0 && length === 0) {
        status = "INSUFFICIENT_FUNDS";
        change = [];
      }
    }
    return change;
  }


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
    <div className="page" style={{ backgroundColor: bgColor, color: bgColor }}>
      <div className="floater"></div>
      <section className="board">
        <h1>{Object.values(randomQuote)[0]}</h1>
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
