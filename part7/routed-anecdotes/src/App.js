import { useState } from 'react'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>
      
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} - {anecdote.author}</h2>
    <div>Has {anecdote.votes} votes</div>
    For more info see: <a href={`http://${anecdote.info}`}>{anecdote.info}</a>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
  <br/>
    Anecdote app for <a href='https://fullstackopen.com/en'>Full Stack Open</a>.
    <br/>
    See <a href='https://github.com/winstoncooke/fullstackopen-2022/blob/main/part7/routed-anecdotes/src/App.js'>https://github.com/winstoncooke/fullstackopen-2022/blob/main/part7/routed-anecdotes/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content &nbsp;
          <input name='content' {...content} reset={null} />
        </div>
        <div>
          author &nbsp;
          <input name='author' {...author} reset={null} />
        </div>
        <div>
          url for more info &nbsp;
          {/* URLs created here default to localhost, rendering outbound URLs invalid */}
          <input name='info' {...info} reset={null} /> 
        </div>
        <button>create</button>
        <button onClick={(event) => handleReset(event)}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({ message }) => {
  if (message === '') {
    return ''
  }

  return (
    <div>
      {message}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Anecdote created: ${anecdote.content}`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification}/>
      <div>
        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}/>
          <Route path='/create' element={<CreateNew addNew={addNew}/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
