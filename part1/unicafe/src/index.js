import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick,text}) => {
  return (
  <button onClick={onClick}> {text}</button>
  )
}

const Statistic = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

const StaticDisplay = (props) => {
  const [good,neutral,bad] = props.static;
  const sum = good+neutral+bad;
  const average = sum/props.static.length;
  const positive = (good/sum)*100? (good/sum)*100 : 0;
  if(sum === 0) return (<div><p>No Feedback Given</p></div>);
  return (
    <table>
      <tbody>
      <Statistic text="GOOD" value={good} />
      <Statistic text="NEUTRAL" value={neutral} />
      <Statistic text="BAD" value={bad} />
      <Statistic text="SUM" value={sum} />
      <Statistic text="AVERAGE" value={average} />
      <Statistic text="POSITIVE" value={positive} />
      </tbody>
    </table>
  )
};

const App = () => {
  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);
  const handleGood = () => {
      setGood(good + 1)
  }
  const handleNeutral = () => {
      setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return(
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text='GOOD'/>
      <Button onClick={handleNeutral} text='NEUTRAL'/>
      <Button onClick={handleBad} text='BAD'/>
      <h1>Statistic</h1>
      <StaticDisplay static={[good,neutral,bad]} />
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))