import { useReducer, useState } from "react";

const operators: InterfaceOperators = {
  sum: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
}

const reducer = (prevState, action) => {
  let newOutput: string = "";
  let array: string[] = [];
  let result: number = 0;

  switch (action.type) {
    case "sum":
      array = prevState.output.split("+");
      result = parseInt(array[0]) + parseInt(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "subtraction":
      array = prevState.output.split("-");
      result = parseInt(array[0]) - parseInt(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "multiplication":
      array = prevState.output.split("*");
      result = parseInt(array[0]) * parseInt(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "division":
      array = prevState.output.split("/");
      result = parseInt(array[0]) / parseInt(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "numeric_digit":
      newOutput = action.payload;
      return {
        ...prevState, output: prevState.output.concat(newOutput)
      }
    case "operator_digit":
      const symbol = Object.entries(operators).find(item => item[0] == action.payload)[1];

      return {
        ...prevState, output: prevState.output.concat(symbol)
      }
    default:
      break;
  }
}


export function App() {
  const [state, dispatch] = useReducer(reducer, { output: "" });
  const [isOperatorInserted, setIsOperatorInserted] = useState<boolean>(false);
  const [actualOperator, setActualOperator] = useState<string>("");

  const handleNumberClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (value === "0" && state.output.length === 0) return;

    const firstDigitAfterOperator = state.output.indexOf("+");

    if (isOperatorInserted) {
      if (!state.output[firstDigitAfterOperator + 1] && value === "0") return;
    }

    dispatch({ type: "numeric_digit", payload: value });
  }

  const handleOperatorClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (state.output.length === 0) return;
    if (isOperatorInserted) return;

    setIsOperatorInserted(true);
    setActualOperator(value);

    dispatch({ type: "operator_digit", payload: value });
  }

  const calculateExpression = () => {
    if (actualOperator) dispatch({ type: actualOperator })

    setIsOperatorInserted(false);
  }

  return (
    <main>
      <output>{state.output}</output>

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
        <button onClick={handleOperatorClicked} value={"multiplication"}>*</button>
        <button onClick={handleOperatorClicked} value={"division"}>/</button>
      </div>

      <div>
        <button onClick={calculateExpression} value={"calculate"}>=</button>
      </div>

    </main>
  )
}