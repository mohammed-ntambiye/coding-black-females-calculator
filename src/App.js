import React, { useState } from "react";
import "./App.css";
import Wrapper from "./components/wrapper/Wrapper";
import Screen from "./components/screen/Screen";
import ButtonBox from "./components/buttonBox/ButtonBox";
import Button from "./components/button/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    currentNo: 0,
    calculatedRes: 0
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.currentNo).length < 16) {
      setCalc({
        ...calc,
        currentNo:
          calc.currentNo === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.currentNo) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.currentNo + value)))
            : toLocaleString(calc.currentNo + value),
        calculatedRes: !calc.sign ? 0 : calc.calculatedRes
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      currentNo: !calc.currentNo.toString().includes(".")
        ? calc.currentNo + value
        : calc.currentNo
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      calculatedRes:
        !calc.calculatedRes && calc.currentNo
          ? calc.currentNo
          : calc.calculatedRes,
      currentNo: 0
    });
  };

  const calculate = (a, b, sign) => {
    return sign === "+"
      ? a + b
      : sign === "-"
      ? a - b
      : sign === "X"
      ? a * b
      : a / b;
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.currentNo) {
      setCalc({
        ...calc,
        calculatedRes:
          calc.currentNo === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                calculate(
                  Number(removeSpaces(calc.calculatedRes)),
                  Number(removeSpaces(calc.currentNo)),
                  calc.sign
                )
              ),
        sign: "",
        currentNo: 0
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      currentNo: calc.currentNo
        ? toLocaleString(removeSpaces(calc.currentNo) * -1)
        : 0,
      calculatedRes: calc.calculatedRes
        ? toLocaleString(removeSpaces(calc.calculatedRes) * -1)
        : 0,
      sign: ""
    });
  };

  const percentClickHandler = () => {
    let currentNo = calc.currentNo
      ? parseFloat(removeSpaces(calc.currentNo))
      : 0;
    let calculatedRes = calc.calculatedRes
      ? parseFloat(removeSpaces(calc.calculatedRes))
      : 0;

    setCalc({
      ...calc,
      currentNo: (currentNo /= Math.pow(100, 1)),
      calculatedRes: (calculatedRes /= Math.pow(100, 1)),
      sign: ""
    });
  };

  const resetClickHandler = () => {
    setCalc({
      sign: "",
      currentNo: 0,
      calculatedRes: 0
    });
  };

  const handleUserActions = (event, input) => {
    switch (input) {
      case "C":
        resetClickHandler();
        break;
      case "+-":
      case "-":
        invertClickHandler();
        break;
      case "%":
        percentClickHandler();
        break;
      case "=":
        equalsClickHandler();
        break;
      case "/":
      case "X":
      case "-":
      case "+":
        signClickHandler(event);
        break;
      case ".":
        commaClickHandler(event);
        break;
      default:
        numClickHandler(event);
    }
  };

  return (
    <Wrapper>
      <Screen value={calc.currentNo ? calc.currentNo : calc.calculatedRes} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={(event) => handleUserActions(event, btn)}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
