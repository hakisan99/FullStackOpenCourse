import React from 'react';

const NewPerson = (props) => {
    return (
        <form onSubmit={props.handleAdd}>
        <div>name: <input value={props.newName} onChange={props.handleInputName} /></div>
        <div>number <input value={props.newNumber} onChange= {props.handleInputNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default NewPerson