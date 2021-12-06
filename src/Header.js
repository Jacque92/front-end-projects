import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const initialState = {
    "Random Quote Machine": false,
    "Markdown Previewer": false,
    "Drum Machine": false,
    "JavaScript Calculator": false,
    "25 + 5 Clock": false,
  };
  const [isPageActivePage, setIsPageActive] = useState({
    ...initialState,
    "Random Quote Machine": true,
  });
  const handleStateChange = (e) => {
    const activeLabel = e.target.innerHTML;
    setIsPageActive({ ...initialState, [activeLabel]: true });
  };
  return (
    <header>
      <nav>
        <ul>
          <Link
            to="/quoteMachine"
            value="1"
            style={{
              textDecoration: "none",
              color: isPageActivePage["Random Quote Machine"]
                ? "black"
                : "grey",
            }}
            onClick={handleStateChange}
          >
            <li>Random Quote Machine</li>
          </Link>
          <Link
            to="/markdownPreviewer"
            style={{
              textDecoration: "none",
              color: isPageActivePage["Markdown Previewer"] ? "black" : "grey",
            }}
            onClick={handleStateChange}
          >
            <li>Markdown Previewer</li>
          </Link>
          <Link
            to="/drumMachine"
            style={{
              textDecoration: "none",
              color: isPageActivePage["Drum Machine"] ? "black" : "grey",
            }}
            onClick={handleStateChange}
          >
            <li>Drum Machine</li>
          </Link>
          <Link
            to="/calculator"
            style={{
              textDecoration: "none",
              color: isPageActivePage["JavaScript Calculator"]
                ? "black"
                : "grey",
            }}
            onClick={handleStateChange}
          >
            <li>JavaScript Calculator</li>
          </Link>
          <Link
            to="/clock"
            style={{
              textDecoration: "none",
              color: isPageActivePage["25 + 5 Clock"] ? "black" : "gray",
            }}
            onClick={handleStateChange}
          >
            <li>25 + 5 Clock</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
