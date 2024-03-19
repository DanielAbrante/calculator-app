import { render, screen, fireEvent } from '@testing-library/react'
import { App } from "./App"

it("Should return the negative operator at begin of expression", () => {
  render(<App />)

  const output = screen.getByTestId("output");
  const button = screen.getByText("-");

  fireEvent.click(button);

  expect(output.textContent).toBe("-");
})

it("Should return nothing when using whatever operator than negative at begin of expression", () => {
  render(<App />)

  const output = screen.getByTestId("output");
  const sumOperator = screen.getByText("+");
  const divisionOperator = screen.getByText("/");
  const multiplicationOperator = screen.getByText("x");

  fireEvent.click(sumOperator);
  expect(output.textContent).toBe("");

  fireEvent.click(divisionOperator);
  expect(output.textContent).toBe("");

  fireEvent.click(multiplicationOperator);
  expect(output.textContent).toBe("");
})

it("Should return nothing when using a dot after another dot", () => {
  render(<App />)
  const dot = screen.getByRole("button", { name: "del-button" });
  const output = screen.getByTestId("output");

  fireEvent.click(dot);
  fireEvent.click(dot);

  expect(output.textContent).toBe(output.textContent);
})

it("Should return nothing when using a dot after another dot", () => {
  render(<App />)
  const dot = screen.getByRole("button", { name: "del-button" });
  const output = screen.getByTestId("output");

  fireEvent.click(dot);
  fireEvent.click(dot);

  expect(output.textContent).toBe(".");
})

it("Should return nothing when not passing a number before or after the dot", () => {
  render(<App />)
  const dot = screen.getByRole("button", { name: "del-button" });
  const output = screen.getByTestId("output");

  const randomOperator = screen.getByText("/");

  fireEvent.click(dot);
  fireEvent.click(randomOperator);
  expect(output.textContent).toBe(".");
})
