import React from 'react'
import Country from './Country'

const Countries = ({countriesToShow}) => {
    return (
        <div>
        {countriesToShow.map(coountry =>
          <Country key={coountry.name} coountry={coountry}/>
        )}
      </div>
    )
}

export default Countries