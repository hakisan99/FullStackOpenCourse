import React from 'react';

const Search = ({searchText,handleSearch}) =>
    <div>Filter show with <input value={searchText} onChange={handleSearch} /></div>

export default Search