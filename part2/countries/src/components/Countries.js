import React from 'react'
import CountrySimple from './CountrySimple'
import CountryDetailed from './CountryDetailed'

const Countries = ({countriesToShow}) => {
    if (countriesToShow.length === 1) {
        return (
            <div>
                {countriesToShow.map(country =>
                <CountryDetailed key={country.name.common} country={country}/>
                )}
            </div>
        )
    }
    else if (countriesToShow.length <= 10) {
        return (
            <div>
                {countriesToShow.map(country =>
                <CountrySimple key={country.name.common} country={country}/>
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