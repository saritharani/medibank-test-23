import React from "react";
import { render, screen } from "@testing-library/react";
import CatList from "./CatList";

test("renders CatList component with provided catList", () => {
  const catList = {
    male: ["Tom", "Jerry"],
    female: ["Fluffy", "Whiskers"]
  };

  render(<CatList catList={catList} />);

  // Check if rendered elements match the provided catList
  expect(screen.getByText("Tom")).toBeInTheDocument();
  expect(screen.getByText("Jerry")).toBeInTheDocument();
  expect(screen.getByText("Fluffy")).toBeInTheDocument();
  expect(screen.getByText("Whiskers")).toBeInTheDocument();
});
