const Person = ({person, deletePerson}) => {
    return (
        <div>
            {person.name}: {person.number} &nbsp;
            <button onClick={deletePerson}>{'Delete'}</button>
        </div>
    )
}

export default Person