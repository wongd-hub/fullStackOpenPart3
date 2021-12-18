const mongoose = require('mongoose')

if (process.argv.length < 5) {
    console.log('Please provide the password and person details as arguments: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://hellodb:${password}@cluster0.tckt1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(result => {
  console.log('Note saved')
  mongoose.connection.close()
})

Person.find({}).them(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})