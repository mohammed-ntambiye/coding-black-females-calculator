import React from 'react';
import "./App.css";
import Wrapper from "./components/wrapper/Wrapper";
import Screen from "./components/screen/Screen";
import ButtonBox from "./components/buttonBox/ButtonBox";
import Button from "./components/button/Button";

const calculatorBtnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

function App() {
  return (
    <Wrapper>
      <Screen value="0" />
      <ButtonBox>
        {calculatorBtnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={() => {
                console.log(`${btn} clicked!`);
              }}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
