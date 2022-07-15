import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => 
      dispatch(setAnecdotes(anecdotes))
    )
  }, [dispatch])

  return (
    <div>
      {notification && <Notification/>}
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App