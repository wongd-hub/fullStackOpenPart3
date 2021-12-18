require("dotenv").config()
const express = require("express")
var morgan = require("morgan")
const cors = require("cors")
const app = express()
const Person = require("./models/person")

app.use(cors())
app.use(express.static("build"))
app.use(express.json())

// Define error handling function
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

morgan.token("post_contents", (request) => {
  if (request.body.name) {
    return JSON.stringify(request.body)
  }})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post_contents"))

app.get("/info", (request, response, next) => {

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

app.get("/api/persons", (request, response, next) => {

  Person
    .find({})
    .then(person => response.json(person))
    .catch(error => next(error))

})

app.get("/api/persons/:id", (request, response, next) => {

  Person
    .findById(request.params.id)
    .then(person => response.json(person))
    .catch(error => next(error))

})

app.delete("/api/persons/:id", (request, response, next) => {

  Person
    .findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))

})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  // If body is empty return error response
  if (!body.name || !body.number) {

    return response.status(400).json({
      error: "content missing"
    })

  }

  Person
  // First, check if there is another entry with the same name - case insensitive
    .find({})
    .then(result => result.map(per => per.name))
    .then(result => result.filter(el => el.toLowerCase() === body.name.toLowerCase()))
  // If there is; update it. If not, add a new entry
    .then(result => {

      if (result.length > 0) {

        const person = {
          number: body.number
        }

        Person
          .findOneAndUpdate(
            { name: result[0] },
            person,
            // Adding a blocker so that a unique name cannot be updated here
            //  feels counter-intuitive to this part; hopefully am interpreting
            //  the exercise correctly.
            { runValidators: true, context: "query", new: true }
          )
          .then(updatedPerson => {
            return response.json(updatedPerson)
          })
          .catch(error => next(error))

      } else {

        const person = new Person({
          name:   body.name,
          number: body.number,
          date:   new Date()
        })

        person
          .save()
          .then(savedPerson => {
            return response.json(savedPerson)
          })
          .catch(error => next(error))

      }

    })

})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})