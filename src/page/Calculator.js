import React from "react";
import { useState } from "react";
//屏幕显示换行

const keyboardData = [
  { id: "1", type: "AC", display: "AC" },
  { id: "2", type: "operator", display: "/" },
  { id: "3", type: "operator", display: "*" },
  { id: "4", type: "number", display: "7" },
  { id: "5", type: "number", display: "8" },
  { id: "6", type: "number", display: "9" },
  { id: "7", type: "operator", display: "-" },
  { id: "8", type: "number", display: "4" },
  { id: "9", type: "number", display: "5" },
  { id: "10", type: "number", display: "6" },
  { id: "11", type: "operator", display: "+" },
  { id: "12", type: "number", display: "1" },
  { id: "13", type: "number", display: "2" },
  { id: "14", type: "number", display: "3" },
  { id: "15", type: "number", display: "0" },
  { id: "16", type: "number", display: "." },
  { id: "17", type: "=", display: "=" },
];

export const Calculator = () => {
  const [firstNum, setFirstNum] = useState("");
  const [currentNum, setCurrentNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("0");
  const [lastInput, setLastInput] = useState("");
  const [isFloat, setIsFloat] = useState(false);

  const getResult = (num1, num2, method) => {
    switch (method) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      case "AC":
        return 0;
    }
  };

  const handleInput = (e) => {
    const { id, type, display } = e;
    let currentResult;

    //handle ClEAR
    if (type === "AC") {
      setResult(0);
      setFirstNum("");
      setSecondNum("");
      setOperator("");
      setLastInput("");
    }

    //handle OPERATOR
    if (type === "operator") {
      if (lastInput === "number") {
        if (firstNum === "") {
          if (isFloat) {
            currentResult = result.split(".");
            console.log(parseInt(currentResult[0]));
            console.log(parseFloat("0." + currentResult[1]));
            console.log(
              parseInt(currentResult[0]) + parseFloat("0." + currentResult[1])
            );
            setResult(
              parseInt(currentResult[0]) + parseFloat("0." + currentResult[1])
            );
          }
          setFirstNum(result);
        }
        if (firstNum !== "") {
          // setSecondNum(result);
          currentResult = getResult(
            parseFloat(firstNum),
            parseFloat(result),
            operator
          );
          setResult(currentResult);
          setFirstNum(currentResult);
        }
      }
      setIsFloat(false);
      setOperator(display);
      setLastInput("operator");
    }

    //handle NUMBER
    if (type === "number") {
      if (lastInput === "") {
        setResult(parseInt(result + display).toString());
      }
      if (lastInput === "number") {
        if (display === ".") {
          if (!isFloat) {
            setResult(result + display);
          } else {
            setResult(result);
          }
        } else if (display === "0") {
          setResult(parseFloat(result + display));
        } else {
          setResult(result + display);
        }
      }
      if (lastInput === "operator") {
        setResult(display);
      }
      if (lastInput === "=") {
        setResult(display);
        setFirstNum("");
        setSecondNum("");
        setOperator("");
      }
      if (display === ".") {
        setIsFloat(true);
      }

      setLastInput("number");
    }

    //handle EQUAL
    if (type === "=") {
      if (lastInput === "number" && firstNum !== "" && operator !== "") {
        currentResult = getResult(
          parseFloat(firstNum),
          parseFloat(result),
          operator
        );
        setResult(currentResult);
        setFirstNum(currentResult);
        setSecondNum("");
        setOperator("");
      }
      if (operator === "") {
        setResult(result);
        setFirstNum(result);
        setSecondNum("");
        setOperator("");
        setLastInput("");
      }
      setLastInput("=");
    }
  };

  return (
    <div className="page calculator">
      <section className="board">
        <div className="screen">
          <p style={{ fontSize: 30, color: "white" }}>{result}</p>
        </div>
        <div className="keys">
          {keyboardData.map((oneButton) => {
            return (
              <button
                type="button"
                key={oneButton.id}
                onClick={() => handleInput(oneButton)}
                setFirstNum={setFirstNum}
                setSecondNum={setSecondNum}
                setResult={setResult}
              >
                {oneButton.display}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
