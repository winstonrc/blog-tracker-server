import React from 'react'

const Country = ({country}) => {
    return (
        <div>{country.name} {country.number}</div>
    )
}

export default Country