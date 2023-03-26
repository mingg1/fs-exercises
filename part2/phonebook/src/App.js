import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newQuery, setNewQuery] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const clearMessage = () =>
    setTimeout(() => {
      setNotificationMessage(null);
      setError(false);
    }, 3000);

  const clearFields = () => {
    setNewName('');
    setNewNumber('');
    clearMessage();
  };

  const addNewPerson = (evt) => {
    evt.preventDefault();
    const duplicatePerson = persons.find((person) => person.name === newName);
    if (duplicatePerson) {
      if (
        window.confirm(
          `${duplicatePerson.name} is already added to the phonebook. Do you want to replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...duplicatePerson, number: newNumber };
        return personService
          .update(duplicatePerson.id, updatedPerson)
          .then((data) => {
            setPersons(
              persons.map((person) => {
                return person.id === data.id ? updatedPerson : person;
              })
            );
            setNotificationMessage(
              `The number of ${newName} has been updated: ${newNumber}`
            );
            clearFields();
          })
          .catch((_) => {
            setError(true);
            setPersons(
              persons.filter((person) => person.id !== duplicatePerson.id)
            );
            setNotificationMessage(
              `Information of ${duplicatePerson.name} has already been deleted from the server`
            );
            clearMessage();
          });
      }
    }

    const newPerson = { name: newName, number: newNumber };
    personService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setNotificationMessage(
          `New person ${newName}: ${newNumber} has been added`
        );
      })
      .catch((err) => {
        setNotificationMessage(err);
        setError(true);
      })
      .finally(() => clearFields());
  };

  const changeNewName = (evt) => {
    setNewName(evt.target.value);
  };
  const changeNewNumber = (evt) => {
    setNewNumber(evt.target.value);
  };

  const searchPersons = (evt) => {
    setNewQuery(evt.target.value);
  };

  const filterResult =
    newQuery !== ''
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(newQuery.toLowerCase())
        )
      : persons;

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .deleteNote(id)
        .then((_) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMessage(
            `${person.name}: ${person.number} has been deleted!`
          );
          clearMessage();
        })
        .catch((_) => {
          setError(true);
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMessage(
            `Information of ${person.name} has already been deleted from the server`
          );
          clearMessage();
        });
    }
  };

  return (
    <div>
      <Notification message={notificationMessage} error={error} />
      <h2>Phonebook</h2>
      <Filter value={newQuery} onValueChange={searchPersons} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={changeNewName}
        onNumberChange={changeNewNumber}
        onSubmit={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filterResult} onDelete={deletePerson} />
    </div>
  );
};

export default App;
