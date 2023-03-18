import React from "react";
import { Textfit } from '@tomplum/react-textfit';
import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <div data-testid="screen">
      <Textfit className="screen" mode="single" max={70}  >
        {value}
      </Textfit>
    </div>
  );
};

export default Screen;