import React from 'react'


export default function Searchbar(props) {
    return (
        <>
            <div className="px-2">
                <input value={props.searchField} className='form-control' type='search' name='searchField' placeholder='Search Employees' onChange={props.handleInputChange} />
            </div>
        </>
    )
}
