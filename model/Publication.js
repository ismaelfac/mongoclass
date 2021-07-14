const mongoose = require('mongoose');

const PublicationsSchema = new mongoose.Schema(
    {
        title: {
            type:String, 
            index: true 
        },
        description: {
            type: String
        },
        author: {
            type: mongoose.Types.ObjectId
        },
        categories: {
            type: Array,
            default: [],
            index: true
        },
        likes: {
            type: String
        },
        isActive: {
            type: Boolean,
            index: true
        }
    },
    {
        timestamps: true
    }
)

const publications = new mongoose.model('publications', PublicationsSchema)

module.exports = {publications}