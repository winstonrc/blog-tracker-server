import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Result = ({ text, value}) => {

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  
  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Title text='give feedback'/>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Title text='statistics'/>
      <div>{'good ' + good}</div>
      <div>{'neutral ' + neutral}</div>
      <div>{'bad ' + bad}</div>
    </div>
  )
}

export default App