import React, {useState, useEffect} from 'react'
import PersonService from './services/PersonService'; 

const Filter = ({changeHandler}) => {
    return (
    <div>
    rajaa tuloksia <input onChange={changeHandler} />
    </div>)
}

const Persons = ({ contactInfo, filter, createDeletorForPerson }) => {
    const potentials = filter === '' ?
    contactInfo 
    : contactInfo.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
    
   return  potentials.map(p => (
   <div key={p.name}>
        {`${p.name} ${p.number}`}
        <button onClick={createDeletorForPerson(p)}>poista</button>
   </div>))
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
    const [notificationInfo, setNotificationInfo] = useState({message: null, isError:false}); 
    

    useEffect(() => {
        PersonService.getPersons()
        .then(data => setPersons(data))
    }, []);

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber] = useState(''); 
    const [ filterString, setFilterString ] = useState(''); 

    const addNewInformation = (event) => {
        event.preventDefault(); 



        if(persons.map(p => p.name).includes(newName)){
            if(window.confirm(`Henkilö ${newName} on jo luettelossa, korvataanko vanha numero uudella?`)){
                const updatedPerson = {...persons.find(p => p.name === newName), number: newNumber}; 
                PersonService.updatePerson(updatedPerson)
                .then(data => setPersons(persons.map(p => p.id !== data.id ? p : data)))
                .then(data => {
                    setNotificationInfo({
                        message: `Päivitettiin henkilön ${newName} puhelinnumero`, 
                        isError: false 
                    }); 
                })
                .catch(data => {
                    setNotificationInfo({
                        message: `Henkilö ${newName} on jo poistettu`, 
                        isError: true 
                    }); 
                    setPersons(persons.filter(p => p.name !== newName)); 

                }); 

            }

        } else {
            
        const newPerson = {
            name: newName, 
            number: newNumber, 
            id: persons.length + 1
        }
        PersonService.addPerson(newPerson)
        .then(p => setPersons(persons.concat(p)));  

        setNotificationInfo({
            message: `Lisättiin ${newName}`, 
            isError: false
        });

        setNewName(''); 
        setNewNumber(''); 
        }
        setTimeout(() => {setNotificationInfo({message: null, isError: false})}, 4000); 
    }


    const changeNumberValue = (event) => {
        setNewNumber(event.target.value); 
    }

    const changeNameValue = (event) => {
        setNewName(event.target.value); 
    }

    const changeFilterString = (event) => setFilterString(event.target.value); 

    const createDeletorForPerson = (deletablePerson) => () => {
        if(window.confirm(`Poistetaanko ${deletablePerson.name}?`)){
            const id = deletablePerson.id; 
            PersonService.deletePerson(id)
            .then(response => {
                setNotificationInfo({message: `Henkilö ${deletablePerson.name} poistettu onnistuneesti`, isError: false})
            }).catch(response => {
                setNotificationInfo({message: `Henkilö ${deletablePerson.name} on jo poistettu`, isError: true})
            }); 
            setPersons(persons.filter(p => p.id !== id)); 
        }
        setTimeout(() => {setNotificationInfo({
            message: null, 
            isError: false
        })}, 4000); 
    }

    return (
    <div>
        <h2>Puhelinluettelo</h2>
        <MessageBox notificationInfo={notificationInfo}/>
        <Filter changeHandler={changeFilterString} />
        <h3>Lisää uusi</h3>
        <PersonForm
            nameValue={newName} nameChangeFunction={changeNameValue}
            numberValue={newNumber} numberChangeFunction={changeNumberValue}
            submitFunction={addNewInformation}
         />

        <h2>Numerot</h2>
        <Persons contactInfo={persons} 
        filter={filterString} createDeletorForPerson={createDeletorForPerson}/>   
    </div>)
}

const MessageBox = ({notificationInfo}) => {
    const message = notificationInfo.message; 
    const isError = notificationInfo.isError; 
    if(message === null){
        return <></>; 
    }
    
    const messageStyle = {
        color: isError ? 'red' : 'green', 
        background: 'lightgrey', 
        fontSize: 20, 
        borderStyle: 'solid', 
        borderRadius: 5, 
        padding: 10, 
        marginBottom: 10 
    }

    return(
        <div style={messageStyle}>
            {message}
        </div>
    ); 
}



export default App