require('dotenv').config()
const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person')

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

// Define error handling function
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
app.use(errorHandler)

morgan.token('post_contents', (request, response) => {
    if (request.body.name) {
        return JSON.stringify(request.body)
    }});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_contents'));

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response, next) => {

    Person
        .find({})
        .then(result => {
            response.send(`
            <p>Phonebook has info for ${result.length} people</p>
            <p>${new Date()}</p>
            `)
        })
        .catch(error => next(error))

})

app.get('/api/persons', (request, response, next) => {

    Person
        .find({})
        .then(person => response.json(person))
        .catch(error => next(error))
        
})

app.get('/api/persons/:id', (request, response, next) => {

    Person
        .findById(request.params.id)
        .then(person => response.json(person))
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {

    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
          })
    } else if (Person.find({}).then(result => result.map(per => per.name).includes(body.name))) {

        return Person
            .find({})
            .then(result => result.find(per => per.name)._id.toString())
            .then(id => {
                const person = {
                    number: body.number
                }

                Person
                    .findByIdAndUpdate(id, person, { new: true })
                    .then(updatedPerson => {
                        response.json(updatedPerson)
                    })
                    .catch(error => next(error))

            })

    }

    const person = new Person({
        name:   body.name,
        number: body.number,
        date:   new Date()
    })

    person
        .save()
        .then(savedPerson => {
            response.json(person)
        })
        .catch(error => next(error))

})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})