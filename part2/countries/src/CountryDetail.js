import React from 'react';
import {useState} from 'react';

const CountryDetail = ({country}) => {
    const [showDetails, setShowDetails] = useState(false);
    const clickToShow = () => {
        setShowDetails(!showDetails)
    }

    if(showDetails){
    return(
        <div>
            <button onClick={clickToShow}>Show less</button>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={'flag'} width={'400px'}/>
        </div>
    )} else {
        return <div><button onClick={clickToShow}>Show details</button></div>
    }
    
    
}

export default CountryDetail