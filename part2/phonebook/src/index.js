import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { useState, useEffect  } from 'react'

import personService from './services/persons'

const Filter = ({filter,setFilter}) => {

  const handleFilterChange = (event) =>  {
    setFilter(event.target.value);
  }  

  return (
    <div>
      filter shown with <input  value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Notification = ({notification}) => {
  if(notification.message == null || notification.message === '') {
    return null;
  } else {
    return (<div className={notification.style}>{notification.message}</div>
    )
  }

}

const PersonForm = ({persons,setPersons,setNotificationMessage}) => {

  const [ newName, setNewName] = useState('')
  const [ newNumber, setNewNumber] = useState('')  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }  

  const addPerson = (event) => {
    event.preventDefault();

    if(newName === '' || newNumber === '') {
      alert('The name and number need to be introduced!');
      return;
    }

    const personObject = {
        name: newName,
        number: newNumber
    }
    
    let existsPerson = persons.find( (person) => (person.name === personObject.name)) 

    if(existsPerson) {
      if (existsPerson.name === personObject.name && existsPerson.number === personObject.number) {

        alert(`'${personObject.name}' is already added to phonebook`)  

      } else if (personObject.number !== existsPerson.number) {

        if (window.confirm(`'${existsPerson.name}' is already added to phonebook, replace the old number with a new one?`)) {

          personService.updatePerson(existsPerson.id,personObject).then(response => {
            setPersons(persons.map(pr => pr.id !== existsPerson.id ? pr : response.data ));
          }).catch(error => {
            setNotificationMessage({message:`'${existsPerson.name}' was already deleted from server`,style:'notification-error'})
          })
        }
      }
    } else {
      personService.createPerson(personObject).then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');       
        setNewNumber('');
        setNotificationMessage({message:'Added '+personObject.name,style:'notification-ok'})
      }).catch(error => {
        setNotificationMessage({message:error.response.data.error,style:'notification-error'})
      })   
    };
  }  


  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input  value={newName} 
                      onChange={handleNameChange}
              />
      <br/>
        number: <input  value={newNumber} 
                      onChange={handleNumberChange}
              />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>   
  )
}

const Persons = ({filter, persons, setPersons}) => {

  const handleDelete = (person) => {
    if (window.confirm("Delete "+person.name+" ?")) {
        personService.deletePerson(person.id).then(response => {
          setPersons(persons.filter(p => p.id !== person.id));
        });
    }

  }    

  const filteredPersons = () => {
    return (filter ? persons.filter(person => (person.name.toLocaleLowerCase()).includes(filter.toLowerCase())) : persons)  
  }

  const personRows = () => {
    let filterArray = filteredPersons();
    return filterArray.map((person,i) => {return (<p key={i}>{person.name} {person.number} <button key={'btn-'+i} onClick={() => handleDelete(person)}>delete</button></p>)})
  }  

  return (
    <div>
      {personRows()}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [notification, setNotificationMessage ] = useState({
    message:'',
    style:''
  });

  useEffect(() => { 
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])
 
  const [ filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage}/>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
