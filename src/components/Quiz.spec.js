import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Quiz from "./Quiz";
import gradedAssignment from "../mocks/gradedAssignment.mock.json";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the quiz title", () => {
  act(() => {
    render(<Quiz assignment={gradedAssignment} />, container);
  });
  expect(container.querySelector("h1").textContent).toBe("Unit 1: Binary Addition and Subtraction");
});
