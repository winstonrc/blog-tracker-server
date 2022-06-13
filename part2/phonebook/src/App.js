import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNum} onChange={handleNumChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map(person =>
        <Person key={person.name} person={person}/>
        )}
      </div>
    </div>
  )
}

export default App