import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ]); 

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber] = useState(''); 
    const [ filterString, setFilterString ] = useState(''); 

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

    const contactInformations = () =>  {
        const potentials = (filterString === '') ?
         persons 
         : persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()));
        return  potentials.map(p => <div key={p.name}>{`${p.name} ${p.number}`}</div>)
    }

    return (
    <div>
        <h2>Puhelinluettelo</h2>
        rajaa näytettäviä <input onChange={(event) => setFilterString(event.target.value)}/>
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