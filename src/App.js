import React, { Component } from 'react';
import axios from "axios"
import './App.css';


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


const styles={
  employeeContainer:{
    display:"flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}

class App extends Component {

  state = {
    numInput: 0,
    users: []
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  makeRequest = async () => {
    const URL = `https://randomuser.me/api/?results=${this.state.numInput}&nat=us`

    try {
      let results = await axios.get(URL)

      this.setState({ users: results.data.results })

      console.log(results)
    } catch (e) {
      console.log("Error:", e)
    }
  }
  
  sortEmployeesAlphabetical = () => {
    const usersCopy = [...this.state.users]
    const sortedUsers = usersCopy.sort((a, b) => {
      if (a.name.last < b.name.last) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({users: sortedUsers})
  }


  filterFemaleEmployees = () => {
    const usersCopy = [...this.state.users]
    const filteredUsers = usersCopy.filter((user) => user.gender==="female")
    this.setState({users:filteredUsers})
  }

  filterMaleEmployees = () => {
    const usersCopy = [...this.state.users]
    const filteredUsers = usersCopy.filter((user) => user.gender==="male")
    this.setState({users:filteredUsers})
  }

  renderEmployees = () => {
    return this.state.users.map(user => <EmployeeCard
      key={user.id.value}
      img={user.picture.large}
      name={user.name}
      phone={user.phone}
      email={user.email}
    />);
  }

  render() {

    const isNumberEntered = this.state.numInput === 0

    return (
      <div className="App">
        <h1>Sabre International</h1>
        <label htmlFor="numInput"># of Employees
      <input
            id="numInput"
            name="numInput"
            type="number"
            value={this.state.numInput}
            min="0"
            onChange={this.handleInputChange}
          />
        </label>
        <button disabled={isNumberEntered} onClick={this.makeRequest} className="btn btn-primary">{isNumberEntered ? "Please Enter a Number" : "Submit"}</button>
        <button onClick={this.filterFemaleEmployees} className="btn btn-primary">Female Employees</button>
        <button onClick={this.filterMaleEmployees} className="btn btn-primary">Male Employees</button>
        <button onClick={this.sortEmployeesAlphabetical} className="btn btn-primary">Alphabetical</button>
        <div style={styles.employeeContainer}>
          {this.renderEmployees()}
        </div>
      </div>
    );
  }
}

export default App;
