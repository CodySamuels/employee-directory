import React from 'react';


function EmployeeCard({ img, name, phone, email }) {

    return (
      <>
        <div>
          <img style={{padding:"5rem", paddingBottom:"0px",}} src={img} alt={name.first} />
          <div>
            <p>{`${name.first} ${name.last}`}</p>
            <p>{phone}</p>
            <p>{email}</p>
          </div>
        </div>
      </>
    )
  }

  export default EmployeeCard;