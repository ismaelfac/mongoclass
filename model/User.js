const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true
        },
        numberPhone: {
            type:Number,
            default:'123-456'
        }
    },
    {
        timestamps: true
    }
)

const users = new mongoose.model('users', UsersSchema)

module.exports = {users}