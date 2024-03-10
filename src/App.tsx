import { useState } from "react";

export function App() {
  const [output, setOutput] = useState("");
  const [isOperatorInserted, setIsOperatorInserted] = useState(false);
  const [actualOperator, setActualOperator] = useState("");

  const handleNumberClicked = (event) => {
    const value = event.target.value;

    const newOutput = output.concat(value);

    setOutput(newOutput);
  }

  const handleOperatorClicked = (event) => {
    const value = event.target.value;

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
        // result = array.reduce((prevValue, actual) => parseInt(prevValue) + parseInt(actual), 0);

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
        <button onClick={handleNumberClicked} value={1}>1</button>
        <button onClick={handleNumberClicked} value={2}>2</button>
        <button onClick={handleNumberClicked} value={3}>3</button>
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