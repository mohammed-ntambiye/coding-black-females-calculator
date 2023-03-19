import React from 'react';
import { render } from "@testing-library/react";
import Wrapper from "./Wrapper";

describe("Wrapper tests", () => {
  it("should render app", () => {
    const { container } = render(<Wrapper />);
    expect(container.getElementsByClassName("wrapper").length).toBe(1);
  });
});
