import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import EmployeeCard from './components/employeeCard'
import Button from './components/button'
import Jumbotron from './components/jumbotron';
import Searchbar from './components/searchbar';


const styles = {
  employeeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
}

class App extends Component {

  state = {
    searchField: '',
    users: [],
    filteredUsers: []
  }

  componentDidMount() {
    this.makeRequest()
  }

  handleInputChange = (event) => {
    event.preventDefault();
    let usersCopy = [...this.state.users]
    this.setState({ searchField: event.target.value, filteredUsers: usersCopy.filter(user => (user.name.first.toLowerCase().includes(event.target.value.toLowerCase()) || user.name.last.toLowerCase().includes(event.target.value.toLowerCase()))) })
  }

  makeRequest = async () => {
    const URL = `https://randomuser.me/api/?results=20&nat=us`

    try {
      let results = await axios.get(URL)

      this.setState({
        users: results.data.results,
        filteredUsers: results.data.results
      })

      console.log(results)
    } catch (e) {
      console.log('Error:', e)
    }
  }

  sortEmployeesAlphabetical = (event) => {
    event.preventDefault()
    const usersCopy = [...this.state.users]
    const sortedUsers = usersCopy.sort((a, b) => {
      if (a.name.last < b.name.last) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({ filteredUsers: sortedUsers })
  }

  filterFemaleEmployees = (event) => {
    event.preventDefault()
    const usersCopy = [...this.state.users]
    const filteredUsers = usersCopy.filter((user) => user.gender === 'female')
    this.setState({ filteredUsers: filteredUsers })
  }

  filterMaleEmployees = (event) => {
    event.preventDefault()
    const usersCopy = [...this.state.users]
    const filteredUsers = usersCopy.filter((user) => user.gender === 'male')
    this.setState({ filteredUsers: filteredUsers })
  }

  renderEmployees = () => {
    return this.state.filteredUsers.map(user => <EmployeeCard
      key={user.id.value}
      img={user.picture.large}
      name={user.name}
      phone={user.phone}
      email={user.email}
    />);
  }

  render() {

    return (
      <div className='App'>
        <Jumbotron />

        <div className="row d-flex justify-content-center">
          <form className="form">

          <Searchbar search={this.state.searchField} handleInputChange={this.handleInputChange} />

          <Button onHandleClick={this.filterFemaleEmployees} title={'Filtery By Female Employees'} />

          <Button onHandleClick={this.filterMaleEmployees} title={'Filter By Male Employees'} />

          <Button onHandleClick={this.sortEmployeesAlphabetical} title={'Sort By Alphabetical'} />
          </form>

        </div>
        
        <div style={styles.employeeContainer}>
          {this.renderEmployees()}
        </div>

      </div>
    );
  }
}

export default App;