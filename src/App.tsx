import styles from "./App.module.css";
import { useEffect, useReducer, useState } from "react";
import { calculatorReducer, initialState } from "./calculatorReducer";
import { IOperators } from "./types/global";

export const operators: IOperators = {
  sum: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
}

export function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [actualOperator, setActualOperator] = useState<string>("");
  const [operatorsQuantity, setOperatorsQuantity] = useState<number>(0);
  const [theme, setTheme] = useState<string>("theme01");
  const [toggleId, setToggleID] = useState<string>("01")

  const handleNumber = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    const previousDigit = state.output[state.output.length - 1];

    if (state.output.length === 0) setOperatorsQuantity(operatorsQuantity + 1);

    const operatorValues = Object.values(operators);

    for (const operatorValue of operatorValues) {
      if (previousDigit === operatorValue && state.output.length > 1) {
        if (state.output[state.output.length - 2] !== "*" && state.output[state.output.length - 2] !== "/")
          setOperatorsQuantity(operatorsQuantity + 1);
      }
    }

    dispatch({ type: "numeric_digit", payload: value });
  }

  const handleOperator = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value: string = event.currentTarget.value;
    const previousDigit = state.output[state.output.length - 1];
    const actualDigit = operators[value as keyof IOperators];

    if (operatorsQuantity >= 3) return;

    if (state.output.length === 0) {
      if (value === "multiplication" || value === "division" || value === "sum") return;
      else setOperatorsQuantity(operatorsQuantity + 1)
    }

    if (previousDigit === ".") return;

    if (previousDigit === "*" && actualDigit !== "-" || previousDigit === "/" && actualDigit !== "-") return

    const operatorValues = Object.values(operators);

    for (const operatorValue of operatorValues) {
      if (previousDigit === "+" && actualDigit === operatorValue) return;
      if (previousDigit === "-" && actualDigit === operatorValue) return;
    }

    setOperatorsQuantity(operatorsQuantity + 1);

    if (operatorsQuantity <= 1) setActualOperator(value);

    dispatch({ type: "operator_digit", payload: value });
  }

  const handleReset = () => {
    setOperatorsQuantity(0);

    dispatch({ type: "reset" })
  }

  const handleDel = () => {
    const actualDigit = state.output[state.output.length - 1];
    const previousValue = state.output[state.output.length - 2];

    const operatorValues = Object.values(operators);

    for (const operatorValue of operatorValues) {
      if (actualDigit === operatorValue) setOperatorsQuantity(operatorsQuantity - 1);
      if (actualDigit !== operatorValue && previousValue === operatorValue) setOperatorsQuantity(operatorsQuantity - 1);

    }

    dispatch({ type: "del" })
  }

  const handleDot = () => {
    if (state.output[state.output.length - 1] === ".") return;

    dispatch({ type: "dot" })
  }

  const calculateExpression = () => {
    setOperatorsQuantity(0);
    dispatch({ type: actualOperator })
  }

  const changeTheme = (event: React.MouseEvent<HTMLDivElement>, newTheme: string) => {
    const actualElement = event.currentTarget

    document.getElementById(toggleId)!.className = styles.toggleCircle

    setToggleID(actualElement.id);
    setTheme(newTheme);

    actualElement.className = `${styles.toggleCircle} ${styles.isActive}`;

    document.body.className = styles[theme]
  }

  useEffect(() => {
    function setDefaultTheme() {
      document.body.className = styles[theme];
    }

    setDefaultTheme();
  })

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1>calc</h1>
          <div className={styles.rightHeaderContainer}>
            <span>THEME</span>
            <div className={styles.containerToggleTheme}>
              <div className={styles.containerToggleThemeType}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <div className={styles.containerToggleThemeButtons}>
                <div>
                  <div id="01" onClick={(e) => changeTheme(e, "theme01")} className={`${styles.toggleCircle} ${styles.isActive}`}></div>
                </div>
                <div>
                  <div id="02" onClick={(e) => changeTheme(e, "theme02")} className={`${styles.toggleCircle}`}></div>
                </div>
                <div>
                  <div id="03" onClick={(e) => changeTheme(e, "theme03")} className={`${styles.toggleCircle}`}></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <output data-testid="output">{state.output}</output>

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
          <button aria-label="del-button" onClick={handleDot} className={styles.dot}>.</button>

          <button onClick={handleReset} className={styles.reset}>RESET</button>
          <button aria-label="calculate-expression" onClick={calculateExpression} className={styles.calculate} value={"calculate"}>=</button>
        </div>
      </article>
    </main>
  )
}