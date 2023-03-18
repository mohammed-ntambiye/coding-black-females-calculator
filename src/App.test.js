import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("Calculator tests", () => {
  it("should render app", () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName("wrapper").length).toBe(1);
  });

  describe("Displaying user input", () => {
    it("should accurately display user input on screen", () => {
      const { container } = render(<App />);
      expect(container.getElementsByClassName("wrapper").length).toBe(1);
    });

    it.each([
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["8", "8"],
      ["9", "9"]
    ])(
      "when the input is '%s the screen should display %s'",
      (input, expected) => {
        render(<App />);
        const start = screen.getByText(input);
        fireEvent.click(start);
        const displayScreen = screen.getByTestId("screen");
        expect(displayScreen.textContent).toBe(expected);
      }
    );
  });

  describe("Processing whole numbers", () => {
    it.each([
      ["1", "+", "1", "2"],
      ["2", "-", "1", "1"],
      ["9", "X", "2", "18"],
      ["4", "/", "2", "2"]
    ])(
      "should accurately process(whole numbers) '%s %s %s = %s'",
      (no1, sign, no2, result) => {
        render(<App />);
        const btnInput1 = screen.getByText(no1);
        const btnSign = screen.getByText(sign);
        const btnInput2 = screen.getByText(no2);
        const equalsSign = screen.getByText("=");

        fireEvent.click(btnInput1);
        fireEvent.click(btnSign);
        fireEvent.click(btnInput2);
        fireEvent.click(equalsSign);

        const displayScreen = screen.getByTestId("screen");
        expect(displayScreen.textContent).toBe(result);
      }
    );
  });

  describe("Processing decimals", () => {
    it.each([
      ["6", "5", "+", "1", "7.5"],
      ["7", "5", "-", "6", "1.5"],
      ["1", "5", "X", "9", "13.5"],
      ["8", "4", "/", "2", "4.2"]
    ])(
      "should accurately process(Decimals) '%s.%s %s %s = %s'",
      (no1, decimal, sign, no2, result) => {
        render(<App />);
        const btnInput1 = screen.getByText(no1);
        const btnDecimalPoint = screen.getByText(".");
        const btnDecimal = screen.getByText(decimal);
        const btnSign = screen.getByText(sign);
        const btnInput2 = screen.getByText(no2);
        const equalsSign = screen.getByText("=");

        fireEvent.click(btnInput1);
        fireEvent.click(btnDecimalPoint);
        fireEvent.click(btnDecimal);
        fireEvent.click(btnSign);
        fireEvent.click(btnInput2);
        fireEvent.click(equalsSign);

        const displayScreen = screen.getByTestId("screen");
        expect(displayScreen.textContent).toBe(result);
      }
    );
  });

  describe("Processing negatives", () => {
    it.each([
      ["5", "+", "1", "-4"],
      ["7", "-", "7", "-14"],
      ["7", "X", "7", "-49"],
      ["7", "/", "2", "-3.5"]
    ])(
      "should accurately process(whole numbers) '-%s %s %s = %s'",
      (no1, sign, no2, result) => {
        render(<App />);
        const btnInput1 = screen.getByText(no1);
        const btnNegation = screen.getByText("+-");
        const btnSign = screen.getByText(sign);
        const btnInput2 = screen.getByText(no2);
        const equalsSign = screen.getByText("=");

        fireEvent.click(btnInput1);
        fireEvent.click(btnNegation);
        fireEvent.click(btnSign);
        fireEvent.click(btnInput2);
        fireEvent.click(equalsSign);

        const displayScreen = screen.getByTestId("screen");
        expect(displayScreen.textContent).toBe(result);
      }
    );
  });

  describe("Performing extended calculations on results ", () => {
    it.each([
      ["3", "+", "5", "+", "9", "17"],
      ["3", "+", "5", "X", "9", "72"],
      ["8", "+", "8", "-", "4", "12"],
      ["8", "+", "8", "/", "4", "4"],

      ["1", "-", "3", "+", "6", "4"],
      ["5", "-", "6", "X", "9", "-9"],
      ["1", "-", "4", "-", "9", "-12"],
      ["7", "-", "5", "/", "7", "0.2857142857142857"],

      ["1", "X", "3", "+", "6", "9"],
      ["5", "X", "6", "X", "9", "270"],
      ["1", "X", "4", "-", "9", "-5"],
      ["7", "X", "5", "/", "7", "5"],

      
      ["1", "/", "3", "+", "6", "6.333333333333333"],
      ["5", "/", "6", "X", "9", "7.5"],
      ["1", "/", "4", "-", "9", "-8.75"],
      ["7", "/", "5", "/", "7", "0.19999999999999998"]

    ])(
      "should accurately per process '(%s %s %s) %s %s  = %s'",
      (no1, sign1, no2, sign2, no3, result) => {
        render(<App />);
        const btnInput1 = screen.getByText(no1);
        const btnSign1 = screen.getByText(sign1);
        const btnInput2 = screen.getByText(no2);
        const btnSign2 = screen.getByText(sign2);
        const btnInput3 = screen.getByText(no3);
        const equalsSign = screen.getByText("=");

        fireEvent.click(btnInput1);
        fireEvent.click(btnSign1);
        fireEvent.click(btnInput2);

        fireEvent.click(equalsSign);

        fireEvent.click(btnSign2);
        fireEvent.click(btnInput3);
        fireEvent.click(equalsSign);

        const displayScreen = screen.getByTestId("screen");
        expect(displayScreen.textContent).toBe(result);
      }
    );
  });
});
