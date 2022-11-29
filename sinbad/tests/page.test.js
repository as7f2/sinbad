// test/pages/index.test.js

import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from "./test-utils";
import Page from "../pages/index";

describe("Page", () => {
  it("should render the heading", () => {
    render(<Page />);

    const heading = screen.getByText("connector.");

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(heading).toBeInTheDocument();
  });
});
