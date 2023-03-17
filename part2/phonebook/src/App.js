import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newQuery, setNewQuery] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState(persons);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data));
    console.log(persons);
  }, []);

  const addNewPerson = (evt) => {
    evt.preventDefault();
    const isNameInList = persons.find((person) => person.name === newName);
    if (isNameInList) {
      return alert(`${newName} is already added to the phonebook`);
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const changeNewName = (evt) => {
    setNewName(evt.target.value);
  };
  const changeNewNumber = (evt) => {
    setNewNumber(evt.target.value);
  };
  const changeNewQuery = (evt) => {
    setNewQuery(evt.target.value);
  };

  const searchPersons = (evt) => {
    evt.preventDefault();
    const result = newQuery
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(newQuery.toLowerCase())
        )
      : persons;

    setSearch(result);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={newQuery}
        onValueChange={changeNewQuery}
        onSubmit={searchPersons}
      />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={changeNewName}
        onNumberChange={changeNewNumber}
        onSubmit={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={search} />
    </div>
  );
};

export default App;
