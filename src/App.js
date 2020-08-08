import React, { Component } from 'react';
import axios from "axios"
import './App.css';

class App extends Component {

  state = {
    numInput: 0,
    users:[]
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  makeRequest = async () => {
    const URL = `https://randomuser.me/api/?results=${this.state.numInput}&nat=us`
    let data;
    try {
      data = await axios.get(URL)
      let {
        data: { results },
      } = data;

      this.setState({users:results})
      
      console.log(results)
    } catch (e) {
      console.log("Error:", e)
    }
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

        <div className="container employeeContainer">
          {this.state.numInput}
        </div>
      </div>
    );
  }
}

export default App;
