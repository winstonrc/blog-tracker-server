import React from 'react'
import {useState, useEffect} from 'react'
import CountryDetailed from './CountryDetailed'

const Countries = ({filteredCountries}) => {
    const [selectedCountry, setSelectedCountry] = useState(undefined)

    useEffect(() => {
        setSelectedCountry(undefined)
    }, [filteredCountries])

    const handleButton = ({country}) => {
        setSelectedCountry(country)
    }

    if (filteredCountries.length === 1) {
        return (
            <div>
                {filteredCountries.map(country =>
                <CountryDetailed key={country.name.common} country={country}/>
                )}
            </div>
        )
    }
    else if (filteredCountries.length <= 10) {
        return (
            <div>
                {filteredCountries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button>show</button>
                </div>
                )}
            </div>
        )
    }
    else {
        return (
            <div>
                Too many matches, please filter.
            </div>
        )
    }
}

export default Countries