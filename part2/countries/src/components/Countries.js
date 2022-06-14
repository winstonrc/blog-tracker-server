import React from 'react'
import {useState, useEffect} from 'react'
import CountryDetails from './CountryDetails'

const Countries = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState(undefined)

    useEffect(() => {
        setSelectedCountry(undefined)
    }, [countries])

    const handleButton = ({country}) => {
        setSelectedCountry(country)
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
                {countries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    {/* <button onClick={handleButton(country) ? 'hide' : 'show'}></button> */}
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