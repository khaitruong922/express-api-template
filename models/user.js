const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required."]
    },
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    phone: {
        type: String,
    },
    position: {
        type: String,
    },
})
const User = mongoose.model('user', UserSchema)
module.exports = User