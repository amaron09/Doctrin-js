import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

// Question component
class symptomBoolQuestion extends Component {
    
    // 1 state for each symptom that will be patched into an array object
    state = {
        breathing: Boolean,
        neck: Boolean,
        chest: Boolean,
        abdominal: Boolean
    }

    // Change state based on radio button input. input name and state name are the same for dynamic event handler
    onHandleChangeValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // Patch using question 3 on backend. The states in this compinent are put in a object. Next question id is then called
    handleOnSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/person/q3/${this.props.person.ssn}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
                radiosymptoms: {
                    breathing: this.state.breathing,
                    neck: this.state.neck,
                    chest: this.state.chest,
                    abdominal: this.state.abdominal
                } 
            })
        })
        .then(response => {
            this.props.nextQuestion(4)
        })
    }

    render() {

        // render all radiobutton cases, can probably be much better optimized 
        return (
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Do you have any of the following?</legend>
                    <Label for="breathing">Problem breathing</Label>
                    <FormGroup check>
                        <Label for="breathing">
                        <Input 
                            type="radio"
                            name="breathing"
                            value={true}
                            
                            onClick={this.onHandleChangeValue}
                        />
                        Yes
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="breathing">
                        <Input 
                            type="radio"
                            name="breathing"
                            value={false}
                           
                            onClick={this.onHandleChangeValue}
                        />
                        No
                        </Label>
                    </FormGroup>
                    <Label for="neck">Stiff neck</Label>
                    <FormGroup check>
                        <Label for="neck">
                        <Input 
                            type="radio"
                            name="neck"
                            value={true}

                            onClick={this.onHandleChangeValue}
                        />
                        Yes
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="neck">
                        <Input 
                            type="radio"
                            name="neck"
                            value={false}

                            onClick={this.onHandleChangeValue}
                        />
                        No
                        </Label>
                    </FormGroup>
                    <Label for="chest">Chest pain</Label>
                    <FormGroup check>
                        <Label for="chest">
                        <Input 
                            type="radio"
                            name="chest"
                            value={true}

                            onClick={this.onHandleChangeValue}
                        />
                        Yes
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="chest">
                        <Input 
                            type="radio"
                            name="chest"
                            value={false}

                            onClick={this.onHandleChangeValue}
                        />
                        No
                        </Label>
                    </FormGroup>
                    <Label for="abdominal">Abdominal pain</Label>
                    <FormGroup check>
                        <Label for="abdominal">
                        <Input 
                            type="radio"
                            name="abdominal"
                            value={true}

                            onClick={this.onHandleChangeValue}
                        />
                        Yes
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="abdominal">
                        <Input 
                            type="radio"
                            name="abdominal"
                            value={false}

                            onClick={this.onHandleChangeValue}
                        />
                        No
                        </Label>
                    </FormGroup>
                    <Input
                        type="submit"
                        value="Next"
                    />
                </FormGroup>
            </Form>
        )
    }
}

export default symptomBoolQuestion;