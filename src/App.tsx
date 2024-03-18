import styles from "./App.module.css";
import { useReducer, useState } from "react";
import { calculatorReducer, initialState } from "./calculatorReducer";

export const operators: IOperators = {
  sum: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
}

export function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [isOperatorInserted, setIsOperatorInserted] = useState<boolean>(false);
  const [actualOperator, setActualOperator] = useState<string>("");
  const [isDotInserted, setIsDotInserted] = useState<boolean>(false);

  const handleNumber = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (value === "0" && state.output.length === 0) return;

    if (isOperatorInserted) {
      const symbol = Object.entries(operators).find(item => item[0] == actualOperator)[1];

      const firstDigitAfterOperator = state.output.indexOf(symbol);

      if (!state.output[firstDigitAfterOperator + 1] && value === "0") return;
    }

    dispatch({ type: "numeric_digit", payload: value });
  }

  const handleOperator = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (state.output.length === 0) {
      if (value === "sum" || value === "division" || value === "multiplication") return;
    }

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

    if (state.output[state.output.length - 1] === ".") return;

    if (isDotInserted) return;
    else {
      dispatch({ type: "dot" });
      setIsDotInserted(true);
    }

  }

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1>calc</h1>
          <span>THEME</span>
        </header>

        <output data-testid="output" className={styles.output}>{state.output}</output>

        <div className={styles.operatorsContainer}>
          <button onClick={handleNumber} className={styles.zero} value={0}>0</button>
          <button onClick={handleNumber} value={7}>7</button>
          <button onClick={handleNumber} value={8}>8</button>
          <button onClick={handleNumber} value={9}>9</button>
          <button onClick={handleNumber} value={4}>4</button>
          <button onClick={handleNumber} value={5}>5</button>
          <button onClick={handleNumber} value={6}>6</button>
          <button onClick={handleNumber} value={1}>1</button>
          <button onClick={handleNumber} value={2}>2</button>
          <button onClick={handleNumber} value={3}>3</button>


          <button onClick={handleOperator} className={styles.sum} value={"sum"}>+</button>
          <button onClick={handleOperator} className={styles.subtraction} value={"subtraction"}>-</button>
          <button onClick={handleOperator} className={styles.multiplication} value={"multiplication"}>x</button>
          <button onClick={handleOperator} className={styles.division} value={"division"}>/</button>
          <button onClick={handleDel} className={styles.del}>DEL</button>
          <button onClick={handleDot} className={styles.dot}>.</button>

          <button onClick={handleReset} className={styles.reset}>RESET</button>
          <button onClick={calculateExpression} className={styles.calculate} value={"calculate"}>=</button>
        </div>
      </article>
    </main>
  )
}