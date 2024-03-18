import { render, screen, fireEvent, getByText, getByRole, getByTestId } from '@testing-library/react'
import { App } from "./App"

test("Should return the negative operator at begin of expression", () => {
  render(<App />)

  const output = screen.getByTestId("output");
  const button = screen.getByText("-");

  fireEvent.click(button);
  expect(output.textContent).toBe("-");
})

test("Should fail when using whatever operator than negative at begin of expression", () => {
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