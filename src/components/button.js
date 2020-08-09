import React from 'react'

function Button ({onHandleClick, title, disabledBy}) {
    return( 
        <>
        <button onClick={onHandleClick} disabled={disabledBy} className="btn btn-primary">{title}</button>
        </>
    )
}

export default Button;