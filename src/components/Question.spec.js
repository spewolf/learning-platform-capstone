import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Question from "./Question";

const mockQuestion = {
  type: "binaryAddition",
  content: "What is 1100 + 0011?",
  arguments: ["1100", "0011"],
};

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

it("renders the title and text", () => {
  act(() => {
    render(<Question question={mockQuestion}/>, container);
  });
  expect(container.querySelector("h2").textContent).toBe("What is 1100 + 0011?");
});

it("displays helper text", () => {
  act(() => {
    render(<Question question={mockQuestion} result={false}/>, container);
  });
  expect(container.querySelector("p").style.color).toBe("red")
  
  act(() => {
    render(<Question question={mockQuestion} result={true}/>, container);
  })
  expect(container.querySelector("p").style.color).toBe("green")
});
