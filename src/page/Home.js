import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "./Clock";
import { DrumMachine } from "./DrumMachine";
import { Calculator } from "./Calculator";
import { QuoteMachine } from "./QuoteMachine";
import { MarkdownPreviewer } from "./MarkdownPreviewer";

import { useState } from "react";
export const Home = () => {
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
  const toggleDisplay = (e) => {
    const activeLabel = e.target.innerHTML;
    setIsPageActive({ ...initialState, [activeLabel]: true });
  };

  return (
    <div className="wrapper">
      <h1>Front End Projects</h1>
      <p>
        A collection of small projects built to practice Html, Css and
        JavaScript. <em>Responseive Design</em> Applied and implemented with
        <em> Flex Box</em> and
        <em> Grid Css</em>.
      </p>

      <ul className="projectList">
        <li>
          <h4>Random Quote Machine </h4>
          <QuoteMachine />
        </li>
        <li>
          <h4>25 + 5 Clock </h4>
          <Clock />
        </li>
        <li>
          <h4>Drum Machine </h4>
          <DrumMachine />
        </li>
        <li>
          <h4>JavaScript Calculator</h4>
          <Calculator />
        </li>
        {/* <li>
          <h4>Markdown Previewer </h4>
          <MarkdownPreviewer />
        </li> */}
      </ul>
    </div>
  );
};
