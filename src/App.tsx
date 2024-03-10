import { useState } from "react";

const operators = {
  sum: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
};

export function App() {
  const [output, setOutput] = useState("");
  const [isOperatorInserted, setIsOperatorInserted] = useState(false);
  const [actualOperator, setActualOperator] = useState("");

  const handleNumberClicked = (event) => {
    const value = event.target.value;

    if (value === "0" && output.length === 0) {
      return;
    }

    const firstDigitAfterOperator = output.indexOf("+");

    if (isOperatorInserted) {
      if (!output[firstDigitAfterOperator + 1] && value === "0") return;
    }

    // const firstDigitAfterOperator = output.indexOf(operators.filter(item => item === actualOperator))

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
    <main>
      <output>{output}</output>

      <div>
        <button onClick={handleNumberClicked} value={0}>0</button>
        <button onClick={handleNumberClicked} value={1}>1</button>
        <button onClick={handleNumberClicked} value={2}>2</button>
        <button onClick={handleNumberClicked} value={3}>3</button>
        <button onClick={handleNumberClicked} value={4}>4</button>
        <button onClick={handleNumberClicked} value={5}>5</button>
        <button onClick={handleNumberClicked} value={6}>6</button>
        <button onClick={handleNumberClicked} value={7}>7</button>
        <button onClick={handleNumberClicked} value={8}>8</button>
        <button onClick={handleNumberClicked} value={9}>9</button>
      </div>

      <div>
        <button onClick={handleOperatorClicked} value={"sum"}>+</button>
        <button onClick={handleOperatorClicked} value={"subtraction"}>-</button>
      </div>

      <div>
        <button onClick={calculateExpression} value={"calculate"}>=</button>
      </div>

    </main>
  )
}