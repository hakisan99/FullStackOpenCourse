import React from 'react';


const DisplayPeople = ({PeopleToshow,deletePerson}) => {
    return (
    <div>
    <h2>Numbers</h2>
        {PeopleToshow().map(person => 
        <div key={person.name}>
            <p>{person.name}</p>
            <p>{person.number}</p>
            <button onClick={()=> deletePerson(person.id)} >Delete</button>
        </div>
        )}
    </div>
    )
}

export default DisplayPeople