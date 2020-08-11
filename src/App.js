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
    this.setState({
      searchField: event.target.value, filteredUsers: usersCopy.filter(user => (user.name.fullName.toLowerCase().includes(event.target.value.toLowerCase())))
    })
  }

  makeRequest = async () => {
    const URL = `https://randomuser.me/api/?results=20&nat=us`

    try {
      let results = await axios.get(URL)
      results.data.results.map(user => {
        const fullName = `${user.name.first} ${user.name.last}`
        user.name.fullName = fullName
        return user
      })

      this.setState({
        users: results.data.results,
        filteredUsers: results.data.results
      })


    } catch (e) {
      console.log('Error:', e)
    }
  }

  sortEmployeesLastAlphabetical = (event) => {
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

  sortEmployeesFirstAlphabetical = (event) => {
    event.preventDefault()
    const usersCopy = [...this.state.users]
    const sortedUsers = usersCopy.sort((a, b) => {
      if (a.name.first < b.name.first) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({ filteredUsers: sortedUsers })
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
          <form className="form-inline d-flex-inline justify-content-center">

            <Searchbar search={this.state.searchField} handleInputChange={this.handleInputChange} />
            <Button onHandleClick={this.sortEmployeesFirstAlphabetical} title={'Sort by First Name'} />
            <Button onHandleClick={this.sortEmployeesLastAlphabetical} title={'Sort by Last Name'} />

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