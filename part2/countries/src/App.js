import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const countriesToShow = filter
  ? countries.filter(country => {
    if (country.name.common.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }
    return false
  })
  : countries

const handleFilterChange = (event) => {
  setFilter(event.target.value)
}

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App;
