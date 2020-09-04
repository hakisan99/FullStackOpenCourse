import React, { useState, useEffect } from "react";
import DisplayPeople from "./DisplayPeople";
import Search from "./Search";
import NewPerson from "./NewPerson";
import phoneBookService from "./server/PhoneService";
import MessageDisplay from "./Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    phoneBookService.getAll().then((persons) => setPersons(persons));
  }, []);
  const [searchText, setSearchText] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newMessage,setMessage] = useState({message:'',type:''});
  
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  let PeopleToshow = () => {
    const _searchText = searchText.toLowerCase();
    if (!_searchText) {
      PeopleToshow = [...persons];
    } else {
      PeopleToshow = persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(_searchText) !== -1 ||
          person.number.indexOf(_searchText) !== -1
      );
    }
    return PeopleToshow;
  };

  const handleInputName = (e) => {
    setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const nameArr = persons.map((person) => person.name);

    if (nameArr.indexOf(newName) === -1) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      
      phoneBookService.addPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({message: `Added ${newName}`,type:'success'});
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
    } else {
      let confirmReplace = window.confirm(
        `This person is already added in the phonebook, do you want to replace this person?`
      );
      if (confirmReplace) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, name: newName, number: newNumber };
        phoneBookService
          .replacePerson(changedPerson.id, changedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson
              )
            )
          );
      }
    }
  };

  const handleDelete = (id) => {
    let confirmDelete = window.confirm(
      `Do you want to delete this person from phone book?`
    );
    if (confirmDelete) {
      phoneBookService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {

          setMessage({message: `Information of ${(persons.find(person => person.id === id).name)} had already been removed from the server`,type:'error'});
          setTimeout(()=>{
            setMessage({message:'',error:''});
          },5000);
          setPersons(persons.filter((person) => person.id !== id));
        })
  }}
  ;
  
  return (
    <div>
      <h2> Phonebook </h2>
      <MessageDisplay messageDisplay={newMessage} />
      <Search searchText={searchText} handleSearch={handleSearch} />
      <NewPerson
        newName={newName}
        newNumber={newNumber}
        handleSearch={handleSearch}
        handleAdd={handleAdd}
        handleInputName={handleInputName}
        handleInputNumber={handleInputNumber}
      />
      <DisplayPeople PeopleToshow={PeopleToshow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
