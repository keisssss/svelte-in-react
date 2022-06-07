import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isMouted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  });

  return (
    <div className="App">
      <div className="block-container">
        <span>rewrite</span>
        {isMouted && (
          <div
            className="block"
            id="state1"
            style={{ border: "2px solid pink" }}
          >
            HTML-element 1
          </div>
        )}
        <div className="block" id="state2" style={{ border: "2px solid blue" }}>
          HTML-element 2
        </div>
        <div
          className="block"
          id="state3"
          style={{ border: "2px solid green" }}
        >
          HTML-element 3
        </div>
      </div>
      <div className="insert-container">
        <span>insert</span>
        <div className="block" id="state4" style={{ border: "2px solid red" }}>
          HTML-element 4
        </div>
      </div>
    </div>
  );
}

export default App;
