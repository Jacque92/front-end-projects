import React from "react";
import { useState, useEffect } from "react";

const SetUp = ({ title, length, handleIncrease, handleDecrease }) => {
  return (
    <div className="setup">
      <table>
        <tr>
          <th>Break Length</th>
          <td>
            <button onClick={() => handleDecrease("Break")}>-</button>
            <input type="text" value={length.Break}></input>
            <button onClick={() => handleIncrease("Break")}>+</button>
          </td>
        </tr>
        <tr>
          <th>Session Length</th>
          <td>
            <button onClick={() => handleDecrease("Session")}>-</button>
            <input type="text" value={length.Session}></input>
            <button onClick={() => handleIncrease("Session")}>+</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export const Clock = () => {
  const [activeSession, setActiveSession] = useState("Session");
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [length, setLength] = useState({
    Break: 5,
    Session: 25,
  });

  let timer;

  const updateCount = () => {
    if (isTimerOn) {
      timer =
        !timer &&
        setInterval(() => {
          //控制秒
          if (second > 0) {
            //之后改成0
            setSecond((prev) => prev - 1);
          } else if (second === 0) {
            setSecond(60);
          }

          //控制分
          if (minute > 0 && second === 0) {
            setMinute((prev) => prev - 1);
            setSecond(59);
          }
          if (minute === 0 && second === 0) {
            //到0分0秒，切换状态
            if (activeSession === "Session") {
              setActiveSession("Break");
              setMinute(Object.values(length)[0]);
              setSecond(0);
            } else {
              setActiveSession("Session");
              setMinute(Object.values(length)[1]);
              setSecond(0);
            }
          }
        }, 1000);
    }

    if (!isTimerOn) clearInterval(timer);
  };

  useEffect(() => {
    updateCount();
    return () => clearInterval(timer);
  }, [second, isTimerOn]);

  const handleIncrease = (key) => {
    setLength({ ...length, [key]: length[key] + 1 });

    setSecond(0);
    if (activeSession === key) {
      setMinute(length[key] + 1);
    }
  };
  const handleDecrease = (key) => {
    if (length[key] > 0) {
      setLength({ ...length, [key]: length[key] - 1 });

      setSecond(0);
      if (activeSession === key) {
        setMinute(length[key] - 1);
      }
    }
  };

  const handleStart = () => {
    setIsTimerOn(true);
  };

  const handleStop = () => {
    setIsTimerOn(false);
  };
  const handleReset = () => {
    setMinute(25);
    setSecond(60);
    setLength({
      Break: 5,
      Session: 25,
    });
    setIsTimerOn(false);
  };

  return (
    <div className="page clock">
      <div className="floater"></div>
      <section className="board">
        <SetUp
          length={length}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />

        <div
          className="display"
          style={{ color: minute === 0 ? "red" : "black" }}
        >
          <h2>{activeSession}</h2>
          <h1>
            {minute === 0 ? "00" : minute < 10 ? "0" + minute : minute}:
            {second === 60 ? "00" : second < 10 ? "0" + second : second}
          </h1>
        </div>
        <div className="btn_group">
          <button onClick={handleStart}>start</button>
          <button onClick={handleStop}>stop</button>
          <button onClick={handleReset}>reset</button>
        </div>
      </section>
    </div>
  );
};
