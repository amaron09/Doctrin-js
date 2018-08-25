import React, { Component } from 'react';

// Component to view your answered questions
class Finished extends Component {

    // State takes a new fresh fetch from db with current ssn
    state = {
        fetchPerson: []
    }

    componentDidMount() {
        fetch(`http://localhost:4000/person/${this.props.person.ssn}`).then(response => response.json())
        .then(updatedPerson => {
            this.setState({ fetchPerson: updatedPerson})
        })
    }

    /* for of loop is used to get elements from fetchPersonObject. 
    Inline if statemenets are used to display differnt answers depending on your choice of radio and checkbox questions
    boolean for some questions are converted to string (bug) and therefore needs string comparison 
    */
    render() {

        let personAnswer;
        let personBoolsymptom;
        let personCheckboxsymptom;

        for(let question of this.state.fetchPerson) {
            personAnswer = 
            <React.Fragment>
                <p>What was the last measured temperature?: <b>{question.temp}</b></p>
                <p>How long was the last measured temperature?: <b>{question.time}</b></p>
                <p>Have you recently traveled abroad?</p>
                { question.traveled === "true"
                ?   <React.Fragment>
                        <p><b>Yes</b></p>
                        <p><b>{question.destination}</b></p>
                    </React.Fragment>
                : <p><b>No</b></p>
                 }
                <h3>symptoms</h3>
            </React.Fragment>
            for (let boolQuestion of question.radiosymptoms) {
                personBoolsymptom = 
                <React.Fragment>
                    { boolQuestion.breathing === "true"
                    ? <p>Problem breathing: <b>yes</b></p>
                    : <p>Problem breathing: <b>no</b></p>
                    }
                    { boolQuestion.neck === "true"
                    ? <p>stiff neck: <b>yes</b></p>
                    : <p>Stiff neck: <b>no</b></p>
                    }
                    { boolQuestion.chest === "true"
                    ? <p>Chest pain: <b>yes</b></p>
                    : <p>Chest pain: <b>no</b></p>
                    }
                    { boolQuestion.abdominal === "true"
                    ? <p>Abodminal pain: <b>yes</b></p>
                    : <p>Abodminal pain: <b>no</b></p>
                    }
                </React.Fragment>
            }
            for (let checkboxQuestion of question.checkboxsymptoms) {
                personCheckboxsymptom = 
                <React.Fragment>
                    { checkboxQuestion.soar
                    ? <p>Soar throat: <b>yes</b></p>
                    : <p>Soar throat: <b>no</b></p>
                    }
                    { checkboxQuestion.cough
                    ? <p>Cough throat: <b>yes</b></p>
                    : <p>Cough throat: <b>no</b></p>
                    }
                    { checkboxQuestion.muscle
                    ? <p>Muscle throat: <b>yes</b></p>
                    : <p>Muscle throat: <b>no</b></p>
                    }
                    { checkboxQuestion.vomiting
                    ? <p>Vomiting throat: <b>yes</b></p>
                    : <p>Vomiting throat: <b>no</b></p>
                    }
                
                </React.Fragment>
            }
        }
            
        return (
            
            <div>
                <h2>Thank you!</h2>
                <h3>Your answers:</h3>
                { personAnswer }
                { personBoolsymptom }
                { personCheckboxsymptom }           
            </div>
        )
    }
}

export default Finished;
