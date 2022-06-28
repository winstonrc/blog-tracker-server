import React from 'react'

const Filter = ({text, filter, handleFilterChange}) => {
    return (
        <div>filter by {text}: <input value={filter} onChange={handleFilterChange} /></div>
    )
}

export default Filter