import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

// Question component for travel
class TravelQuestion extends Component {
    
    // state based on radio button and text input
    state = {
        travel: Boolean,
        destination: ""
    }

    // Dynamic change of state based on input name and state name
    onHandleChangeValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    /* Default destination state is same as input from textbox
    if travel is false destination will be empty
    Patch based on question 5 on backend and change questionId to finish component
    */
    handleOnSubmit = (event) => {
        event.preventDefault()
        let destination = this.state.destination;
        if (!this.state.travel) {
            destination = "";
        }

        fetch(`http://localhost:4000/person/q5/${this.props.person.ssn}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                travel: this.state.travel,
                destination: destination
                
            })
        })
        .then(response => {
            this.props.nextQuestion(6)  
        })    
    }
    

    render() {
        /* Radio button input for travel will always be visible. 
            Textinput for destination will only be visible if travel state is true
        */
        return (
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Have you recently traveled abroad?</legend>
                    <FormGroup check>
                        <Label for="travel">
                        <Input 
                            type="radio"
                            name="travel"
                            value={true}
                            checked={this.state.travel === "true"}
                            onClick={this.onHandleChangeValue}
                        />
                        Yes
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="travel">
                        <Input 
                            type="radio"
                            name="travel"
                            value={false}
                            checked={this.state.travel === "false"}
                            onClick={this.onHandleChangeValue}
                        />
                        No
                        </Label>
                    </FormGroup>
                </FormGroup>
                {this.state.travel === "true" &&
                    <FormGroup>
                        <Label for="destination">Where did you travel?</Label>
                        <Input
                            type="textarea"
                            name="destination"
                            value={this.state.destination}
                            onChange={this.onHandleChangeValue}

                        />
                    </FormGroup>
                }
                <Input
                    type="submit"
                    value="Finish"
                />
            </Form>
        )
    }
}

export default TravelQuestion;