import React from 'react';
import ReactDOM from 'react-dom';
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

const PersonForm = ({persons,setPersons}) => {

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

    const personObject = {
        name: newName,
        number: newNumber
    }
    
    let existsPerson = persons.find( (person) => (person.name === personObject.name)) 


    if(existsPerson) {
        alert(personObject.name+' is already added to phonebook')  
    } else {
        personService.create(personObject).then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');       
          setNewNumber('');  
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

const Persons = ({filter,persons}) => {

  const filteredPersons = () => {
    return (filter ? persons.filter(person => (person.name.toLocaleLowerCase()).includes(filter.toLowerCase())) : persons)  
  }

  const personRows = () => {
    let filterArray = filteredPersons();
  return filterArray.map((person,i) => {return (<p key={i}>{person.name} {person.number} <button key={'btn-'+i}>delete</button></p>)})
  }  

  return (
    <div>
      {personRows()}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 

  useEffect(() => { 
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const [ filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
