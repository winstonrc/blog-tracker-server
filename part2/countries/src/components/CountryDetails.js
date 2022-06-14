import React from 'react'

const CountryDetails = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            Capital: {country.capital}
            <br></br>
            Area: {country.area}
            <h3>Languages:</h3>
            <ul>
                {country.languages instanceof Object
                    ? Object.entries(country.languages).map(([key, value]) => {
                        return <li key={key}>{value}</li>
                    })
                    : 'n/a'
                }
            </ul>
            {country.flags?.png && <img src={country.flags.png} alt ={'Flag of ' + country.name.common}/>}
        </div>        
    )
}

export default CountryDetails