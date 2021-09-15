import React from "react";
import { render, screen } from "@testing-library/react";

import Graph from "../components/Graph";
import Data from "./test-response-intraday-price";

describe("Graph", () => {
  test("renders Graph component", () => {
    render(<Graph data={Data} />);
    expect(screen.getByText("Meta Data")).toBeInTheDocument();
  });
  test("renders Graph component and loads test data", () => {
    render(<Graph data={Data} />);
    expect(screen.getByText("2. Symbol: GME")).toBeInTheDocument();
  });
});
