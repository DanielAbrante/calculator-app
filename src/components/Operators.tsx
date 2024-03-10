import { useState } from "react";

export function Operators({ output, setOutput }: OperatorsProps) {
  const [isOperatorInserted, setIsOperatorInserted] = useState(false);
  const [actualOperator, setActualOperator] = useState("");

  const numbers = Array.from({ length: 10 }, (v, i) => (
    {
      id: i,
      value: i,
    }
  ));

  const handleNumberClicked = (event) => {
    const value = event.target.value;

    if (value === "0" && output.length === 0) {
      return;
    }

    const firstDigitAfterOperator = output.indexOf("+");

    if (isOperatorInserted) {
      if (!output[firstDigitAfterOperator + 1] && value === "0") return;
    }

    const newOutput = output.concat(value);

    setOutput(newOutput);
  }

  const handleOperatorClicked = (event) => {
    const value = event.target.value;

    if (output.length === 0) return;
    if (isOperatorInserted) return;

    setIsOperatorInserted(true);

    let newOutput = "";

    switch (value) {
      case "sum":
        newOutput = output.concat("+");
        setActualOperator("sum");
        break;
      case "subtraction":
        newOutput = output.concat("-");
        setActualOperator("subtraction");
        break;
      default:
        break;
    }

    setOutput(newOutput);
  }

  const calculateExpression = () => {
    let array = [];
    let result = 0;

    switch (actualOperator) {
      case "sum":
        array = output.split("+");
        result = parseInt(array[0]) + parseInt(array[1]);

        setOutput(result.toString());
        setIsOperatorInserted(false);
        break;
      case "subtraction":
        array = output.split("-");
        result = parseInt(array[0]) - parseInt(array[1]);

        setOutput(result.toString());
        setIsOperatorInserted(false);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {numbers.map(number => (
        <button onClick={handleNumberClicked} key={number.id} value={number.value}>{number.value}</button>
      ))}

      <button onClick={handleOperatorClicked} value={"sum"}>+</button>
      <button onClick={handleOperatorClicked} value={"subtraction"}>-</button>

      <button onClick={calculateExpression} value={"calculate"}>=</button>
    </div>
  )
}