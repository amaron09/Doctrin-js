import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

// Question component, each question component has its own state for the current question
class TimeQuestion extends Component {
    state = {
        time: this.props.person.time
    }

    // Change state based on select input
    handleOnChange = (event) => {
        this.setState({ time: event.target.value });
    }

    // Call patch question 2 route in backend and set questionId to the next question
    handleOnSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/person/q2/${this.props.person.ssn}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({time: this.state.time})
        })
        .then(response => {
            this.props.nextQuestion(3)
        });
    }

    render() {

        // Map all select options
        const days = ["0 days","1 days","2 days","3 days","4 days","5 days","6 days","7 days","8 days","9 days","10 days","11 days","12 days","13 days","14 days"];
        const dayOptionList = days.map(function(day, id){
            return <option key={id} value={day}>{day} </option>
        })  

        return (
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup>
                    <Label for="question2">How long was the last measured temperature?</Label>
                    <Input
                        name="question2"
                        type="select"
                        id="question2"
                        onClick={this.handleOnChange}
                    >
                        { dayOptionList }
                    </Input>
                    <Input
                        type="submit"
                        value="Next"
                    />
               </FormGroup>
            </Form>
        )
    }
}

export default TimeQuestion;