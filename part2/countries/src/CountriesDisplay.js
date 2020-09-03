import React  from 'react';
import CountryDetail from './CountryDetail'


const ShowCountries = ({showCountries}) => {
const displayCountries = 
    showCountries.map(country =>{
        return (
            <div key={country.name}>
                <p>{country.name}</p>
                <CountryDetail country={country} defaultShow={showCountries.length===1? true : false}/>
            </div>
        )
    });
    return (
        <div>
            {showCountries.length > 10? `Too many countries, please be more specific` : displayCountries}
        </div>
    )
}

const CountriesDisplay = ({findText,countries}) => {
    const showCountries = countries.filter(country => country.name.toUpperCase().indexOf(findText.toUpperCase()) > -1);
    return (
        <div>
            <ShowCountries showCountries={showCountries} />
        </div>
    )
}


export default CountriesDisplay