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
    switch (actualOperator) {
      case "sum":
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