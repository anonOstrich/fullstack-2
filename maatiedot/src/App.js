import React, { useState, useEffect } from 'react'
import axios from 'axios';

let allCountries = []; 

const CountryInfo = ({country}) => {
    const languages = country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>); 

    return (
        <>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
            {languages}
        </ul>
        <div><img src={country.flag} alt={`The flag of ${country.name}`} height="25%" width="25%" /></div>
        </>
    )
}


const Countries = ({countries}) => {

    let countryList = countries.length >  10 ?
                        <>Too many countries, specify another filter</>
                        : countries.map(country => <div key={country.numericCode}>{country.name}</div>); 

    
    if(countryList.length === 1){
        return(<CountryInfo country={countries[0]} />); 
    }

    return (
    <div>
        {countryList}
    </div>)
}

const App = ({ url }) => {
    const [ filter, setFilter ] = useState(''); 
    const  [ countries, setCountries ] = useState([]); 
    

    // Kun sivu ladannut, hae tiedot maa-APIsta
    useEffect(() => {
        axios
        .get(url)
        .then((response) => {
            console.log("Haettu palvelimelta seuraava:\n", response.data); 
            allCountries = response.data;              
        })
    }, [])

    const handleFilterUpdate = (event) => {
        const newFilter = event.target.value.toLowerCase(); 
        setFilter(newFilter);      
        setCountries(newFilter === '' ? allCountries : allCountries.filter(country => country.name.toLowerCase().includes(newFilter))); 
    }

    return (
        <div>
         <div>
            filter countries <input value={filter} onChange={handleFilterUpdate}/>
        </div>
            <Countries countries={countries} />
        </div>
    )
}



export default App;