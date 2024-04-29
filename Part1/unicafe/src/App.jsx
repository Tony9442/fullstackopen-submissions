import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [natural, setNatural] = useState(0);
  const [bad, setBad] = useState(0);
  //Every click is stored in a separate piece of state
   //called allClicks that is initialized as an empty array:

  // const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0)
  const [totalOne, setTotalOne] = useState(0);
  const [totalTwo, setTotalTwo] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  
  
  
  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood);
    setFeedbackGiven(true);
  };

  const handleNaturalClick = () => {
    const updatedNatural = natural + 1;
    setNatural(updatedNatural);
    setTotalOne(updatedNatural);
    setFeedbackGiven(true);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotalTwo(updatedBad);
    setFeedbackGiven(true);
  };

  const totalFeedbacks = good + natural + bad;
  const averageScore = (good - bad) / totalFeedbacks || 0;
  const positivePercentage = (good / totalFeedbacks) * 100 || 0;

  // if (!good || !natural || !bad) {
  //  return <p>No feedback given</p>
  // }

  return (
    //When the left button is clicked, we add the letter L to the allClicks array:
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNaturalClick}>natural</button>
      <button onClick={handleBadClick}>bad</button>

      {/* <p>{allClicks.join(" ")}</p> */}
      <h2>statistic</h2>
      {feedbackGiven ? (
        <div>
          <table>
            <tbody>
              <tr>
                <td>good:</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>natural:</td>
                <td>{totalOne}</td>
              </tr>
              <tr>
                <td>bad:</td>
                <td>{totalTwo}</td>
              </tr>
              <tr>
                <td>all:</td>
                <td>{totalFeedbacks}</td>
              </tr>
              <tr>
                <td>average:</td>
                <td>{averageScore.toFixed(2)}</td>
              </tr>
              <tr>
                <td>positive:</td>
                <td>{positivePercentage.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
      {/* { (!good || !natural || !bad) ? <p>No feedback given</p> : null
} */}
    </div>
  );
};

export default App;



