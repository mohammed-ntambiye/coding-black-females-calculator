import React from 'react';
import { render, fireEvent, act } from "@testing-library/react";
import Button from "./Button";

describe("Calculator tests", () => {
  test("Should render button component", () => {
    render(<Button className={""} value="10" onClick={()=> console.log("clicked")}  />);
    expect(true).toEqual(true);
  });
});
