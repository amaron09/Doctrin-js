const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Needed to use backend routes at frontend fetch. Better solutions exist like concurrently package
app.use(cors());

const db = require('./config/key').mongoURI;

mongoose.connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(express.static('public'));

app.use(express.json()); // So we can handle JSON-data from the user
app.use(express.urlencoded({ extended: true })); // So we can handle form-data from the user

// mongodb schema can be put in its own folder
// Could optimize and change ssn to number 
// due to bug with boolean convert to string, destination type is set to string
const Person = mongoose.model('Person', {
  ssn: String,
  temp: {
    type: String,
    default: ""
  },
  time: {
    type: String,
    default: ""
  },
  radiosymptoms: {
    type: Array,
    default: []
  },
  checkboxsymptoms: {
    type: Array,
    default: []
  },
  traveled: {
    type: String,
    default: false
  },
  destination: {
    type: String,
    default: ""
  }
});

/****************
 ROUTER SECTION 
****************/
// Should be moved to seperate router folder and module

// Get SSN of all persons in db
app.get('/person', function(request, response) {
  Person.find({ }) 
    .then((documents) => {
      response.json(documents);
    })
});

// Register new user, will only register ssn and create db for that user with empty fields
app.post('/person', function (request, response) {
  const newPerson = new Person({ 
    ssn: request.body.ssn, 
  });
  newPerson.save()
    .then(document => {
      response.json(document);
    })
});

// To find a specific user
app.get('/person/:id', function (request, response) {
  // const todoID = parseInt(request.params.id, 10);
  const ssn = request.params.id.toString();
  Person.find({ ssn: ssn })
    .then((document) => {
      response.json(document);
    })
});

// Function for deleting a user, this function can not be initialized at the frontend
app.delete('/person/:id', function (request, response) {
  //Convert to int from string const todoID = parseInt(request.params.id, 10);
  const ssn = request.params.id.toString();
  Person.findOneAndDelete({ ssn: ssn })
    .then((document) => {
      response.json(document);
    })
});

// Get data from question 1 at the frontend and patch to db
app.patch('/person/q1/:id', function (request, response) {
  const ssn = request.params.id.toString();
  const query = { ssn: ssn };
  Person.findOneAndUpdate(query, { temp: request.body.temp })
    .then((document) => {
      response.json(document);
    })
});

// Get data from question 2 at the frontend and patch to db
app.patch('/person/q2/:id', function (request, response) {
  const ssn = request.params.id.toString();
  const query = { ssn: ssn };
  Person.findOneAndUpdate(query, { time: request.body.time })
    .then((document) => {
      response.json(document);
    })
});

// Get data from question 3 at the frontend and patch to db
app.patch('/person/q3/:id', function (request, response) {
  const ssn = request.params.id.toString();
  const query = { ssn: ssn };
  Person.findOneAndUpdate(query, { radiosymptoms: request.body.radiosymptoms })
    .then((document) => {
      response.json(document);
    })
});

// Get data from question 4 at the frontend and patch to db
app.patch('/person/q4/:id', function (request, response) {
  const ssn = request.params.id.toString();
  const query = { ssn: ssn };
  Person.findOneAndUpdate(query, { checkboxsymptoms: request.body.checkboxsymptoms })
    .then((document) => {
      response.json(document);
    })
});

// Get data from question 5 at the frontend and patch to db
app.patch('/person/q5/:id', function (request, response) {
  const ssn = request.params.id.toString();
  const query = { ssn: ssn };
  Person.findOneAndUpdate(query, { traveled: request.body.travel, destination: request.body.destination })
    .then((document) => {
      response.json(document);
    })
});

// Run backend on port 4000
app.listen(4000);
