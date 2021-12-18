const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log("Connecting to", url)

mongoose.connect(url)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message)
  })


const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, unique: true, uniqueCaseInsensitive: true },
  number: { type: String, required: true, minLength: 8 }
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Person", personSchema)