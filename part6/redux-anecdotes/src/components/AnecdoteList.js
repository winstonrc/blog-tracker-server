import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                Votes: {anecdote.votes} &nbsp;
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}



const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const addVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5))
    }

    return (
        <ul>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => addVote(anecdote)}
                />
            )}
        </ul>
    )
}

export default AnecdoteList
