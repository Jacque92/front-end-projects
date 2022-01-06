import React from "react";
import { useState } from "react";
import { bankOne } from "../data";
import { bankTwo } from "../data";

const Key = ({ sound, isOn, setCurrentKey, volume }) => {
  const { key, display, id, url } = sound;
  const audioElement = new Audio(url);
  audioElement.volume = volume / 11;

  const handleHit = () => {
    if (isOn) {
      audioElement.play();

      setCurrentKey(id);
    } else return;
  };

  return (
    <button onClick={handleHit} value={audioElement}>
      {display}
    </button>
  );
};

export const DrumMachine = () => {
  const [isOn, setIsOn] = useState(true);
  const [bank, setBank] = useState(1);

  const [currentKey, setCurrentKey] = useState("");
  const [currentClip, setCurrentClip] = useState();
  const [volume, setVolume] = useState(3);

  const handleSwitch = () => {
    setIsOn(!isOn);
    setCurrentKey("");
  };
  const handleBank = () => {
    if (bank === 1) {
      setBank(2);
    } else {
      setBank(1);
    }
    setCurrentKey("");
  };
  const handleVolume = (e) => {
    console.log(e.target.value);
    setVolume(e.target.value);
  };

  return (
    <div className="page drumMachine">
      <div className="floater"></div>
      <section className="board">
        <div className="btn_group">
          {bank === 1
            ? bankOne.map((sound) => {
                return (
                  <Key
                    sound={sound}
                    isOn={isOn}
                    setCurrentKey={setCurrentKey}
                    volume={volume}
                  />
                );
              })
            : bankTwo.map((sound) => {
                return (
                  <Key
                    sound={sound}
                    isOn={isOn}
                    setCurrentKey={setCurrentKey}
                    volume={volume}
                  />
                );
              })}
        </div>

        <div className="controlers">
          <div>
            <h3>Power</h3>
            <div className="btn_container" onClick={handleSwitch}>
              <button style={{ float: isOn ? "left" : "right" }}></button>
            </div>
          </div>
          <div>
            <h3>Bank</h3>
            <div className="btn_container" onClick={handleBank}>
              <button style={{ float: bank === 1 ? "left" : "right" }}></button>
            </div>
          </div>
          <p>{isOn ? currentKey || "Power On" : "Power Off"}</p>
          <div style={{ width: "100%" }}>
            <h3>Volume</h3>
            <input
              onChange={handleVolume}
              value={volume}
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="11"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
