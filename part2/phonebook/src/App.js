import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      num: newNum,
    }

    if (!persons.find(element => element.name === personObject.name)) {
      if (personObject.num !== '') {
        if (!persons.find(element => element.num === personObject.num)) {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNum('')
        } else alert(`${newNum} has already been added to phonebook`)
      } else {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNum('')
      }
      console.log('person added', personObject)
    } else alert(`${newName} has already been added to phonebook`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => {
      if (person.name.toLowerCase().includes(filter.toLowerCase())) {
        return true
      }
      return false
    })
    : persons
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter by name: <input value={filter} onChange={handleFilterChange} /></div>
      <h2>Add new person</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNum} onChange={handleNumChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App