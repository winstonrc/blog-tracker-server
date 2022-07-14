import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import { useSelector } from 'react-redux'

const App = () => {
  const notification = useSelector(state => state.notification)

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