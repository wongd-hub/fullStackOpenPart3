const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    let genId = Math.max(...persons.map(n => n.id)); // Initialise ID as something that exists in the database
    var person;

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
          })
    } else if (persons.map(per => per.name).includes(body.name)) {
        return response.status(400).json({ 
            error: 'name matches existing' 
          })
    } else {

        // While genId is in the database, continue to re-draw IDs
        while (persons.map(n => n.id).includes(genId)) {
            genId = Math.floor(Math.random() * 1000);
        }
        
        person = {
            name:   body.name,
            number: body.number,
            date:   new Date(),
            id:     genId
        }

        persons = persons.concat(person)

    }

    response.json(person);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})