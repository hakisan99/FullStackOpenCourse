import React from 'react'

const FindCountry = ({findText,handleFind}) => {
    return (
    <div> Find Countries
        <input value={findText} onChange={handleFind}></input>
    </div>
    )
}

export default FindCountry