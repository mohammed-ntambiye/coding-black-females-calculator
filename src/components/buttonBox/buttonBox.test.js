import React from 'react';
import { render } from "@testing-library/react";
import ButtonBox from "./ButtonBox";

describe("ButtonBox tests", () => {
    it("should render app", () => {
      const { container } = render(<ButtonBox />);
      expect(container.getElementsByClassName("buttonBox").length).toBe(1);
    });
  });
  