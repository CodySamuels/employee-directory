import React from 'react';


function EmployeeCard({ img, name, phone, email }) {

    return (
      <>
        <div style={{margine:"2rem"}}>
          <img className="card-img-top" style={{padding:"5rem", paddingBottom:"0px"}} src={img} alt={name.first} />
          <div className="card-body">
            <h5 className="card-title">{`${name.first} ${name.last}`}</h5>
            <p className="card-text">{phone}</p>
            <p className="card-text">{email}</p>
          </div>
        </div>
      </>
    )
  }

  export default EmployeeCard;