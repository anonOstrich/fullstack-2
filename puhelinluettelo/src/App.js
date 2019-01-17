import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '032374328'}
    ]); 

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber] = useState(''); 

    const addNewInformation = (event) => {
        event.preventDefault(); 

        if(persons.map(p => p.name).includes(newName)){
            alert(`${newName} on jo luettelossa!`);
        } else {
        setPersons(persons.concat({name: newName || 'no name', number: newNumber || 'xxx'})); 
        setNewName(''); 
        }
    }

    const changeNumberValue = (event) => {
        setNewNumber(event.target.value); 
    }

    const changeNameValue = (event) => {
        setNewName(event.target.value); 
    }

    const contactInformations = () =>  persons.map(p => <div key={p.name}>{`${p.name} ${p.number}`}</div>)

    return (
    <div>
        <h2>Puhelinluettelo</h2>
        <form>
            <div>
                nimi: <input value={newName} onChange={changeNameValue} />
            </div>
            <div>
                numero: <input value={newNumber} onChange={changeNumberValue} />
            </div>
            <div>
                <button type="submit" onClick={addNewInformation}>lisää</button>
            </div>
        </form>
        <h2>Numerot</h2>
        {contactInformations()}     
    </div>)
}

export default App