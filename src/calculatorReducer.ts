import { operators } from "./App";

export const initialState: ICalculatorStates = {
  output: ""
}

export const calculatorReducer = (prevState: any, action: any) => {
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