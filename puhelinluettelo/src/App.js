import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({changeHandler}) => {
    return (
    <div>
    rajaa tuloksia <input onChange={changeHandler} />
    </div>)
}

const Persons = ({ contactInfo, filter }) => {
    const potentials = filter === '' ?
    contactInfo 
    : contactInfo.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
    
   return  potentials.map(p => <div key={p.name}>{`${p.name} ${p.number}`}</div>)
}

const PersonForm = ({nameValue, nameChangeFunction, numberValue, numberChangeFunction, submitFunction}) => {
    return(
    <form>
    <div>
        nimi: <input value={nameValue} onChange={nameChangeFunction} />
    </div>
    <div>
        numero: <input value={numberValue} onChange={numberChangeFunction} />
    </div>
    <div>
        <button type="submit" onClick={submitFunction}>lisää</button>
    </div>
</form>)

}

const App = () => {
    
    const [persons, setPersons] = useState([]);
    

    useEffect(() => {
        axios.get("http://localhost:3001/persons")
        .then(response => {
            setPersons(response.data)
        })
    }, []);

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber] = useState(''); 
    const [ filterString, setFilterString ] = useState(''); 

    const addNewInformation = (event) => {
        event.preventDefault(); 

        if(persons.map(p => p.name).includes(newName)){
            alert(`${newName} on jo luettelossa!`);
        } else {

        const newPerson = {
            name: newName, 
            number: newNumber, 
            id: persons.length + 1
        }
         
        axios.post("http://localhost:3001/persons", newPerson)
        .then(response => setPersons(persons.concat(response.data))) 
        setNewName(''); 
        setNewNumber(''); 
        }
    }


    const changeNumberValue = (event) => {
        setNewNumber(event.target.value); 
    }

    const changeNameValue = (event) => {
        setNewName(event.target.value); 
    }

    const changeFilterString = (event) => setFilterString(event.target.value); 

    return (
    <div>
        <h2>Puhelinluettelo</h2>
        <Filter changeHandler={changeFilterString} />
        <h3>Lisää uusi</h3>
        <PersonForm
            nameValue={newName} nameChangeFunction={changeNameValue}
            numberValue={newNumber} numberChangeFunction={changeNumberValue}
            submitFunction={addNewInformation}
         />

        <h2>Numerot</h2>
        <Persons contactInfo={persons} filter={filterString}/>   
    </div>)
}



export default App