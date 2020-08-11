import React from 'react'


export default function Searchbar(props) {
    return (
        <>
            <div className="container pb-3">
                <input value={props.searchField} className='form-control' type='search' name='searchField' placeholder='Search employees by first name' onChange={props.handleInputChange} />

            </div>
        </>
    )
}
