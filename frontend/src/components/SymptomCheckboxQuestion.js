import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

// Question component
class symptomCheckboxQuestion extends Component {

    // State for all checkbox questions, will be put in an array object in db
    state = {
        soar: false,
        cough: false,
        muscle: false,
        vomiting: false
    }

    // Dynamic change of state based on input name and state name
    onHandleChangeValue = (event) => {
        let name = event.target.name;
        if (this.state[name] === true) {
            this.setState({ [event.target.name]: false })
        }
        else {
            this.setState({ [event.target.name]: true})
        }
    }

    // Patch on question 4 route on backend and call next question id
    handleOnSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/person/q4/${this.props.person.ssn}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
                checkboxsymptoms: {
                    soar: this.state.soar,
                    cough: this.state.cough,
                    muscle: this.state.muscle,
                    vomiting: this.state.vomiting
                } 
            })
        })
        .then(response => {
            this.props.nextQuestion(5)
        })
    }

    render() {

        // Render all checkbox cases can probably be much better optimized
        return (
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Do you have any of the following?</legend>
                    <FormGroup check>
                        <Label for="soar">
                        <Input 
                            type="checkbox"
                            name="soar"
                            onChange={this.onHandleChangeValue}
                        />
                        Soar throat
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="cough">
                        <Input 
                            type="checkbox"
                            name="cough"
                            onChange={this.onHandleChangeValue}
                        />
                        Cough
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="muscle">
                        <Input 
                            type="checkbox"
                            name="muscle"
                            onChange={this.onHandleChangeValue}
                        />
                        Muscle pain
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="vomiting">
                        <Input 
                            type="checkbox"
                            name="vomiting"
                            onChange={this.onHandleChangeValue}
                        />
                        Vomiting
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

export default symptomCheckboxQuestion;