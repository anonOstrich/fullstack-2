import React, {useState} from 'react'; 
import axios from 'axios'; 


// To use the program, either create the file from which this imports, 
// or comment the import line and uncomment the next line, and insert your own
// personal api_key there. 
// There are no api_keys in this repository.

import api_key from './KeyInfo'

const Weather = ({capitalName}) => {
    const [weatherInfo, setWeatherInfo] = useState({}); 

    let url = `https://api.apixu.com/v1/current.json?key=${api_key}&q=${capitalName}` 


    //if the needed values are still undefined
        if(!weatherInfo.temp_c){
            axios.get(url).then((response) => setWeatherInfo(response.data.current))
            return <></>;
        }
       
    return(
    <div>
        <h2>{`Weather in ${capitalName}`}</h2>
        <p><strong>temperature: </strong> {weatherInfo.temp_c} Celsius</p> 
        <img src={weatherInfo.condition.icon} alt={weatherInfo.condition.text} />
        <p><strong>wind: </strong> {`${weatherInfo.wind_kph} kph direction ${weatherInfo.wind_dir}`}</p>


    </div>)
}

export default Weather; 