import { useState } from "react";
import { Operators } from "./components/Operators";

export function App() {
  const [output, setOutput] = useState<string>("");

  return (
    <main>
      <output>{output}</output>

      <Operators output={output} setOutput={setOutput} />
    </main>
  )
}