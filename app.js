const mongoose = require('mongoose');
const { users } = require('./model/User')
const { publications } = require('./model/Publication')
const DB_URI = 'mongodb://localhost:27017/app_youtube_blog'

mongoose.connect(DB_URI, {
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

const CreateUsers = () => {
    users.create(
        {
            name: 'Ismael Enrique Lastre Alvarez',
            email: 'ismaelfac@gmail.com',
            numberPhone: '3113258468'
        }, 
        {
            name: 'Valeria Remedios Vasquez Cuesta',
            email: 'vvasques688@gmail.com',
            numberPhone: '3012570118'
        }, 
        {
            name: 'Rosa Maria Alvarez Bermudez',
            email: 'rosaalvarezb@gmail.com',
            numberPhone: '3142579458'
        }
    )
}

const CreatePublications = () => {
    const ListPublications = [
        {
            title: 'Post 1',
            description: 'Description Post 1',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c37f")
        },
        {
            title: 'Post 2',
            description: 'Description Post 2',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c380")
        },
        {
            title: 'Post 3',
            description: 'Description Post 3',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c381")
        },
    ]

    publications.insertMany(ListPublications);
}

//CreateUsers();
//CreatePublications();

// : QUERIES
const findById = async () => {
    const user = await users.findById("60edcd88c4546228ece1c37f");
    console.log('El usuario es -----> ', user);
}

findById();