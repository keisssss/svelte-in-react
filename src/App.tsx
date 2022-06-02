import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="block-container">
        <span>rewrite</span>
        <div className="block" style={{ border: "2px solid pink" }}>
          HTML-element 1
        </div>
        <div className="block" style={{ border: "2px solid blue" }}>
          HTML-element 2
        </div>
        <div className="block" style={{ border: "2px solid green" }}>
          HTML-element 3
        </div>
      </div>
      <div className="insert-container">
        <span>insert</span>
        <div className="block" style={{ border: "2px solid red" }}>
          HTML-element 4
        </div>
      </div>
    </div>
  );
}

export default App;
