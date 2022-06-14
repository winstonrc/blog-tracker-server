import React from 'react'
import {useState, useEffect} from 'react'
import CountryDetails from './CountryDetails'

const Countries = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState(undefined)

    // reset if list of countries changes
    useEffect(() => {
        setSelectedCountry(undefined)
    }, [countries])

    const areNamesIdentical = country => selectedCountry && selectedCountry.name.common === country.name.common
    
    const handleButton = country => () => {
        if (areNamesIdentical(country)) setSelectedCountry(undefined)
        else setSelectedCountry(country)
    }

    if (countries.length === 1) {
        return (
            <div>
                <CountryDetails country={countries[0]}/>
            </div>
        )
    }
    else if (countries.length <= 10) {
        return (
            <div>
                {countries.map(country => {
                    const name = country.name.common
                    return (
                        <div key={name}>
                            {name}
                            <button onClick={handleButton(country)}>{areNamesIdentical(country) ? 'hide' : 'show'}</button>
                        </div>
                    )
                })}

                {selectedCountry && <CountryDetails country={selectedCountry}/>}
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