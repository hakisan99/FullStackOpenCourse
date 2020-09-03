import React, { useState, useEffect } from 'react';
import FindCountry from './FindCountry';
import CountriesDisplay from './CountriesDisplay';
import axios from 'axios';



function App() {
  const [findText,setFindText] = useState('');
  const [countries,setCountries] = useState([]);
  console.log(process.env.REACT_APP_API_KEY)
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(reponse => {setCountries(reponse.data)})
  },[]);

  const handleFind = (e) => {
    setFindText(e.target.value)
  }

  return (
  <div>
    <FindCountry findText={findText} handleFind={handleFind} />
    <CountriesDisplay findText={findText} countries={countries}  />
  </div>
  )
}

export default App;
