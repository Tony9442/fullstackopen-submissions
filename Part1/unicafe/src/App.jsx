import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if(!(props.good || props.netural || props.bad)) {
    return <p>No feedback given</p>
  }
    return (
      <table>
        {/* <p>good {props.good}</p>
        <p>netural {props.netural}</p>
        <p>bad {props.bad}</p>
        <p>all {props.good + props.netural + props.bad}</p>
        <p>average:{(props.good - props.bad) / (props.good + props.netural + props.bad) || 0}</p>
        <p>positive:{(props.good * 100) / (props.good + props.netural + props.bad) || 0} %</p> */}
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="netural" value={props.netural} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine
          text="average"
          value={
            (props.good - props.bad) /
              (props.good + props.netural + props.bad) || 0
          }
        />
        <StatisticLine
          text="postive"
          value={
            (props.good * 100) /
              (props.good + props.netural + props.bad) + " %" || 0
          }
        />
      </table>
    );
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [netural, setNetural] = useState(0);
  const [bad, setBad] = useState(0);
  

  const handleGoodClick = () => setGood(good + 1);
  const handleNeturalClick = () => setNetural(netural + 1);
  const handleBadClick = () => setBad(bad + 1);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeturalClick} text="Netural" />
      <Button handleClick={handleBadClick} text="Bad" />
      <h2>Statistics</h2>
      <Statistics good={good} netural={netural} bad={bad} />
    </div>
  );
}
 
export default App;



