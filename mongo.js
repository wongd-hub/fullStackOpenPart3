const mongoose = require('mongoose')

if (process.argv.length < 3) {

    console.log('Please provide the password as argument: node mongo.js <password>')
    process.exit(1)

} else if (process.argv.length === 4) {

    console.log('When adding a new person, please provide three arguments: node mongo.js <password> <name> <number>')
    process.exit(1)

} else if (process.argv.length === 3) {

    const password = process.argv[2]

    const url = `mongodb+srv://hellodb:${password}@cluster0.tckt1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    
    mongoose.connect(url)
    
    const personSchema = new mongoose.Schema({
      name: String,
      number: String
    })
    
    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(result => {
        console.log("Phonebook: ")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length === 5) {

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

}

