import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum,
    }

    if (!persons.find(element => element.name === personObject.name)) {
      if (personObject.number !== '') {
        if (!persons.find(element => element.number === personObject.number)) {
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
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add new person</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNum={newNum} 
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App