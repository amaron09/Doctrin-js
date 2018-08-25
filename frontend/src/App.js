import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TempQuestion from './components/TempQuestion';
import TimeQuestion from './components/TimeQuestion';
import SymptomBoolQuestion from './components/SymptomBoolQuestion';
import SymptomCheckboxQuestion from './components/SymptomCheckboxQuestion';
import TravelQuestion from './components/TravelQuestion';
import Finished from './components/Finished';
import { Container, ListGroup, ListGroupItem, Label, Input, Button } from 'reactstrap';

class App extends Component {
  /*
  person store all persons registered in db
  ssnFormatError displays error msg if ssn is inputed at wrong format
  currentPerson get all db info on the person that is logged in with ssn
  postText stores the value on the input field
  questionCounter keeps tracks of which question to display

  */ 
  state = {
    persons: [],
    ssnFormatError: "",
    currentPerson: {},
    postText: "",
    questionCounter: 1
  }

  // All ssn of each registred user will be displayed. Might not be a good idea for a real scenario
  componentDidMount(){
    fetch('http://localhost:4000/person').then(response => response.json())
      .then(person => {
        this.setState({ persons: person})
      })
  }

  // Simple input check to see if ssn is in the correct format
  onChangeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value})
    // Simple if statement to check that the ssn is not 12 character long, will printout error msg. Better solution to use regex
    if (this.state.postText.length !== 11) {
      this.setState({ ssnFormatError: "SSN is in the wrong format" })
    }
    else {
      this.setState({ ssnFormatError: "" })
    }
  }

  // Will create a new person in db with ssn and empty field if not already exists
  postPerson = () => {
    
    const persons = this.state.persons
    let personExist;

    // Loop all person to see if ssn inputed already exists in db
    for (let person of persons) {
      if(person.ssn === this.state.postText) {
        personExist = person;
      }
    }

    // If yes set state that person already exist and can continue to form
    if (personExist) {
      this.setState({ currentPerson: personExist })
    }
    // Else create new person with ssn entered in input field, but only if format is correct
    else if (!this.state.ssnFormatError) {
      fetch('http://localhost:4000/person', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ssn: this.state.postText})
    })
    .then(response => response.json())
    .then(addedPerson => {
      const updatedPerson = [...this.state.persons]
      updatedPerson.push(addedPerson);
      this.setState({ persons: updatedPerson })
    })
    }
  };

  // Menu to change question component
  /*
    Since i've got problems with react-router, I tried to recreate a router using
    if statements. Each component has its own number as id and questionCounter at the App state
    matches the id of the question component it is displayed
  */
  questionMenu = (event) => {
    this.setState({ questionCounter: event.target.value })
  }

  // Function to send information to App from children component. Will send id for next question
  changeQuestion = (qId) => {
    this.setState({ questionCounter: qId});
  }

  render() {

    // Map persons to display all ssn registrered
    const persons = this.state.persons;
    const listOfPerson = persons.map(person => (
      <div key={person._id}>
        <h3>{person.ssn}</h3>
      </div>
    ));

    return (
      <div className="App">
        <Container>
          <Label htmlFor="postText">Login or register ssn, 12 numbers</Label>
          <Input 
            type="text"
            name="postText"
            placeholder="ssn: yyymmddxxxx"
            value={this.state.postText}
            onChange={this.onChangeInput}
          />
          <Button onClick={this.postPerson}>Login/register</Button>
          <p>{this.state.ssnFormatError}</p>
          { listOfPerson }
          <hr />
          { this.state.currentPerson.ssn &&
          <React.Fragment>
              <h2>You are logged in as {this.state.currentPerson.ssn}</h2>
              <ListGroup className="mb-5 cursor">
                <ListGroupItem value={1} onClick={this.questionMenu}>Question 1</ListGroupItem>
                <ListGroupItem value={2} onClick={this.questionMenu}>Question 2</ListGroupItem>
                <ListGroupItem value={3} onClick={this.questionMenu}>Question 3</ListGroupItem>
                <ListGroupItem value={4} onClick={this.questionMenu}>Question 4</ListGroupItem>
                <ListGroupItem value={5} onClick={this.questionMenu}>Question 5</ListGroupItem>
                <ListGroupItem value={6} onClick={this.questionMenu}>View answers</ListGroupItem>
              </ListGroup>

            { this.state.questionCounter === 1 &&
              <TempQuestion nextQuestion={this.changeQuestion} person={this.state.currentPerson} />
            }
            { this.state.questionCounter === 2 &&
              <TimeQuestion nextQuestion={this.changeQuestion} person={this.state.currentPerson} />
            }
            { this.state.questionCounter === 3 &&
              <SymptomBoolQuestion nextQuestion={this.changeQuestion} person={this.state.currentPerson} />
            }
            { this.state.questionCounter === 4 &&
              <SymptomCheckboxQuestion nextQuestion={this.changeQuestion} person={this.state.currentPerson} />
            }
            { this.state.questionCounter === 5 &&
              <TravelQuestion nextQuestion={this.changeQuestion} person={this.state.currentPerson} />
            }
            { this.state.questionCounter === 6 &&
              <Finished person={this.state.currentPerson} />
            }
            
          </React.Fragment>
          }
          
        </Container>
      </div>
    );
  }
}

export default App;

