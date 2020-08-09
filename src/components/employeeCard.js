import React from 'react';


function EmployeeCard({ img, name, phone, email }) {

    return (
      <>
        <div>
          <img src={img} alt={name.first} />
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