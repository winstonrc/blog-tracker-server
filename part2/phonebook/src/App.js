import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [greenMessage, setGreenMessage] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum,
    }

    // check if name exists
    if (!persons.find(element => element.name === personObject.name)) {
      // check if number entered is empty
      if (personObject.number !== '') {
        // check if number already is in the phonebook
        if (!persons.find(element => element.number === personObject.number)) {
          personService
            .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNum('')
            })
        } else alert(`${newNum} has already been added to phonebook`)
        // add person to phonebook
      } else {
        personService
            .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNum('')
            })
      }
      console.log('person added', personObject)
      setGreenMessage(true)
      setMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      // if name already exists in the phonebook, ask to update the associated number
        if (window.confirm(`${newName} has already been added to phonebook.
        \nUpdate their phone number?`)) {
          
          const person = persons.find(p => p.name === newName)
          const changedPerson = {...person, number: newNum}
          personService
            .update(person.id, changedPerson)
            .then(changedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : changedPerson))
            })
            .catch(error => {
              setGreenMessage(false)
              setMessage(`${person.name} is not on the server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== personObject.id))
            })
        }
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setGreenMessage(true)
          setMessage(`Removed ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setGreenMessage(false)
          setMessage(`${person.name} was already removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
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
      <Notification message={message} greenMessage={greenMessage}/>
      <Filter text='name' filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add new person</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNum={newNum} 
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App