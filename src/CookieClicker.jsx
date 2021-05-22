import "./styles.css";
import React from "react";

export default function App() {
  const [score, setScore] = React.useState(0);
  const [grandmas, setGrandmas] = React.useState(0);
  const getCookie = () => {
    setScore((prevScore) => prevScore + 1);
  };
  ////
  //this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

  const getGrandma = () => {
    setGrandmas((prevGrandmas) => prevGrandmas + 1);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {score} <br />
      <button onClick={getCookie}>get a cookie </button>
      <br />
      <button onClick={getGrandma}>get a grandma </button>
    </div>
  );
}
