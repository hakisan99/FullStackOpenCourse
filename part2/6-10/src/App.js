import React, { useState } from 'react'
import DisplayPeople from './DisplayPeople';
import Search from './Search';
import NewPerson from './NewPerson';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
        ]);
    
        const [searchText,setSearchText] = useState('');
    const handleSearch = (e) => {
        setSearchText(e.target.value)
    };
    let PeopleToshow = () => {
    const _searchText = searchText.toLowerCase();
    if(!_searchText) {
        PeopleToshow = [...persons];
    } else {
        PeopleToshow = persons.filter(person =>(person.name.toLowerCase().indexOf(_searchText) !==-1 || person.number.indexOf(_searchText) !== -1));
    };
    return PeopleToshow
    }
    

  const [ newName, setNewName ] = useState('');
  const [newNumber,setNewNumber] = useState('');


  const handleInputName = (e) => {
      setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
      setNewNumber(e.target.value)
  }
  const handleAdd =  (e) => {
      e.preventDefault();
      const nameArr = persons.map(person => person.name);
      if(nameArr.indexOf(newName) === -1){
        setPersons(persons.concat({name:newName, number: newNumber}));
        setNewName('');
        setNewNumber('');
      } else {
        window.alert(`${newName} is already added the phonebook`);
      }
      
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchText={searchText} handleSearch={handleSearch}/>
      <NewPerson 
        newName={newName} 
        newNumber={newNumber}
        handleSearch={handleSearch} 
        handleAdd={handleAdd} 
        handleInputName={handleInputName} 
        handleInputNumber={handleInputNumber}
      />
      <DisplayPeople PeopleToshow={PeopleToshow}/>
    </div>
  )
}

export default App