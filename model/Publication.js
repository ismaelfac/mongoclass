const mongoose = require('mongoose');

const PublicationsSchema = new mongoose.Schema(
    {
        title: {
            type:String
        },
        description: {
            type: String
        },
        author: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
)

const publications = new mongoose.model('publications', PublicationsSchema)

module.exports = {publications}