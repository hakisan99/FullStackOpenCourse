import React from 'react';


const DisplayPeople = ({PeopleToshow}) => {
    return (
    <div>
    <h2>Numbers</h2>
        {PeopleToshow().map(person => 
        <div key={person.name}>
            <p>{person.name}</p>
            <p>{person.number}</p>
        </div>
        )}
    </div>
    )
}

export default DisplayPeople