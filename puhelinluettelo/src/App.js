import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ]); 

    const [ newName, setNewName ] = useState('');

    const addNewName = (event) => {
        event.preventDefault(); 
        if(persons.map(p => p.name).includes(newName)){
            alert(`${newName} on jo luettelossa!`);
        } else {
        setPersons(persons.concat({name: newName})); 
        setNewName(''); 
        }
    }

    const changeNameValue = (event) => {
        setNewName(event.target.value); 
    }

    return (
    <div>
        <h2>Puhelinluettelo</h2>
        <form>
            <div>
                nimi: <input value={newName} onChange={changeNameValue} />
            </div>
            <div>
                <button type="submit" onClick={addNewName}>lisää</button>
            </div>
        </form>
        <h2>Numerot</h2>
        
      
    </div>)
}

export default App