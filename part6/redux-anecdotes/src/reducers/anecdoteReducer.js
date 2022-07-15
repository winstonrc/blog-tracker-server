import { createSlice } from "@reduxjs/toolkit"

// sort the anecdotes!! .sort((a, b) => b.votes - a.votes)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push({ content, votes: 0 })
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      const anecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )

      return anecdotes.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
