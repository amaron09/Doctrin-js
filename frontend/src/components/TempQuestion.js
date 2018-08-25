import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

/* Question component, each question component has its own state for the current question */
class TempQuestion extends Component {
    state = {
        temp: this.props.person.temp
    }

    // Change state based on input select
    onChange = (event) => {
        this.setState({ temp: event.target.value });
    }

    // Call path route for question 1 in backend. After the fetch, questionId in App will change to next question
    onSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/person/q1/${this.props.person.ssn}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({temp: this.state.temp})
        })
        .then(response => {
            this.props.nextQuestion(2)
        })
    }

    render() {
        // Map all select option
        const temperatures = ["35 degrees","36 degrees","37 degrees","38 degrees","39 degrees","40 degrees","41 degrees","42 degrees", "Don't know"];
        const tempOptionList = temperatures.map(function(temp, id){
            return <option key={id} value={temp}>{temp}</option>
        });

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label htmlFor="question1">What was the last measured temperature</Label>
                <Input
                    name="question1"
                    type="select"
                    id="question1"
                    onChange={this.onChange}
                >
                    { tempOptionList }
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

export default TempQuestion; 