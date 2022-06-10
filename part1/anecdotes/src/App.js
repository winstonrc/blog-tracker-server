import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.contents}</h1>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Vote = ({vote}) => (
  <p>has {vote} votes</p>
)

const HighestVoted = ({vote}) => {
  return <p>{vote}</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const random = () => (
    Math.floor(Math.random() * anecdotes.length)
  )

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  const handleNextButtonClick = () => {
    setSelected(random)
  }

  const handleVoteClick = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <Header contents="Anecdote of the day"/>
      {anecdotes[selected]}
      <Vote vote={vote[selected]}/>
      <Button handleClick={handleVoteClick} text="vote"/>
      <Button handleClick={handleNextButtonClick} text="next anecdote"/>
      <Header contents="Anecdote with most votes"/>
      <HighestVoted vote={anecdotes[vote.indexOf(Math.max(...vote))]}/>
      <Vote vote={Math.max(...vote)}/>
    </div>
  )
}

export default App