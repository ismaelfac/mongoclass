const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/app_youtube_blog';

const mongo = mongoose.connect(DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}, err => {
    if(err) {
        console.log('****** Conexion Errada *******');
    }else{
        console.log('****** Conexion Exitosa *******');
    }
});

module.exports = {mongo};