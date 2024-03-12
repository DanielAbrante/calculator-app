import styles from "./App.module.css";
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

      result = parseFloat(array[0]) + parseFloat(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "subtraction":
      array = prevState.output.split("-");
      result = parseFloat(array[0]) - parseFloat(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "multiplication":
      array = prevState.output.split("*");
      result = parseFloat(array[0]) * parseFloat(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "division":
      array = prevState.output.split("/");
      result = parseFloat(array[0]) / parseFloat(array[1]);
      return {
        ...prevState, output: result.toString()
      }
    case "reset":
      return {
        ...prevState, output: "",
      }
    case "del":
      newOutput = prevState.output.slice(0, -1);

      return {
        ...prevState, output: newOutput,
      }
    case "dot":
      return {
        ...prevState, output: prevState.output.concat(".")
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
  const [isDotInserted, setIsDotInserted] = useState<boolean>(false);

  const handleNumberClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (value === "0" && state.output.length === 0) return;

    if (isOperatorInserted) {
      const symbol = Object.entries(operators).find(item => item[0] == actualOperator)[1];

      const firstDigitAfterOperator = state.output.indexOf(symbol);

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
    setIsDotInserted(false);

    dispatch({ type: "operator_digit", payload: value });
  }

  const calculateExpression = () => {
    if (actualOperator) dispatch({ type: actualOperator })

    setIsOperatorInserted(false);
  }

  const handleReset = () => {
    dispatch({ type: "reset" })
  }

  const handleDel = () => {
    dispatch({ type: "del" })
  }

  const handleDot = () => {
    if (state.output.length === 0) return;

    const output_length = state.output.length;

    if (state.output[output_length - 1] === ".") return;

    if (isDotInserted) return;
    else {
      dispatch({ type: "dot" });
      setIsDotInserted(true);
    }

  }

  return (
    <main>
      <article>
        <header>
          <h1>calc</h1>
          <span>THEME</span>
        </header>

        <output>{state.output}</output>

        <div className={styles.operatorsContainer}>
          <button className={styles.zero} onClick={handleNumberClicked} value={0}>0</button>
          <button onClick={handleNumberClicked} value={7}>7</button>
          <button onClick={handleNumberClicked} value={8}>8</button>
          <button onClick={handleNumberClicked} value={9}>9</button>
          <button onClick={handleNumberClicked} value={4}>4</button>
          <button onClick={handleNumberClicked} value={5}>5</button>
          <button onClick={handleNumberClicked} value={6}>6</button>
          <button onClick={handleNumberClicked} value={1}>1</button>
          <button onClick={handleNumberClicked} value={2}>2</button>
          <button onClick={handleNumberClicked} value={3}>3</button>


          <button className={styles.sum} onClick={handleOperatorClicked} value={"sum"}>+</button>
          <button className={styles.subtraction} onClick={handleOperatorClicked} value={"subtraction"}>-</button>
          <button className={styles.multiplication} onClick={handleOperatorClicked} value={"multiplication"}>x</button>
          <button className={styles.division} onClick={handleOperatorClicked} value={"division"}>/</button>
          <button onClick={handleDel} className={styles.del}>DEL</button>
          <button onClick={handleDot} className={styles.dot}>.</button>

          <button onClick={handleReset} className={styles.reset}>RESET</button>
          <button className={styles.calculate} onClick={calculateExpression} value={"calculate"}>=</button>
        </div>
      </article>
    </main>
  )
}