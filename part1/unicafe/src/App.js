import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Result = ({ text, value, symbol}) => (
  <div>{text} {value} {symbol}</div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  
  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  const sum = good + neutral + bad

  return (
    <div>
      <Title text='give feedback'/>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Title text='statistics'/>
      <Result text='good' value={good}/>
      <Result text='neutral' value={neutral}/>
      <Result text='bad' value={bad}/>
      <Result text='all' value={sum}/>
      <Result text='average' value={(good * 1 + neutral * 0 + bad * -1) / sum}/>
      <Result text='positive' value={good / sum * 100} symbol='%'/>
    </div>
  )
}

export default App