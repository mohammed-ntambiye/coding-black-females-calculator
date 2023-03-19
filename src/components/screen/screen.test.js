import React from 'react';
import { render } from "@testing-library/react";
import Screen from "./Screen";

describe("Screen tests", () => {
  it("should render app", () => {
    const { container } = render(<Screen />);
    expect(container.getElementsByClassName("screen").length).toBe(1);
  });
});
