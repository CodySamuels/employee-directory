import React from 'react'


export default function Searchbar(props) {
    return (
        <>
            <div className="container pb-3 d-flex justify-content-center">
                <input value={props.searchField} className='form-control' type='search' name='searchField' placeholder='Search Employees' onChange={props.handleInputChange} />
            </div>
        </>
    )
}
