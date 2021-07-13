const mongoose = require('mongoose');
const { users } = require('./model/User');
const { publications } = require('./model/Publication');
const { categories } = require('./model/Category');

const DB_URI = 'mongodb://localhost:27017/app_youtube_blog';

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

const CreateCategory = () => {
    categories.create(
        {
            name: 'Salud'
        },
        {
            name: 'Tech'
        }
    )
}
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
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c37f"),
            categories: ["Salud"]
        },
        {
            title: 'Post 2',
            description: 'Description Post 2',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c380"),
            categories: ["Tech"]
        },
        {
            title: 'Post 3',
            description: 'Description Post 3',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c381"),
            categories: ["Salud"]
        },
        {
            title: 'Post 4',
            description: 'Description Post 4',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c381"),
            categories: ["Tech"]
        },
        {
            title: 'Post 5',
            description: 'Description Post 5',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c380"),
            categories: ["Salud"]
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
const findOnCreate = async () => {
    const post = await publications.findOneAndUpdate(
        {
            title: 'Post 4'
        },
        {
            description: 'Description Post 4',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c380")
        },
        {
            new: true,
            upsert: true
        }
    )
    console.log('**** Buscar o Crear post',post);
}

const editPublications = async () => {
    const post = await publications.updateOne(
        {
            title: 'Post 3'
        },
        {
            title: 'Post 3 Updated',
            description: 'Updated post 3'
        }
    )
    console.log('**** Post Actualizado',post);
}
const editPublicationsWithOperators = async () => {
    const post = await publications.updateMany(
        {
            title: {
                $ne:'Post 3'
            }
        },
        {
            title: 'Post Updated',
            description: 'Updated post 3'
        }
    )
    console.log('**** Post Actualizado',post);
}
//findById();
//findOnCreate();
//editPublications();
//editPublicationsWithOperators();
//CreateCategory();
const publicationsWithUsers = async () => {
    const result = await publications.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authorUser"
            }
        },
        {   $unwind: "$authorUser"},
        {   $match: {title: "Post 4"} }
    ]);
    console.log('******* Result ********',result);
}

//publicationsWithUsers();

const ListCategoriesWithPublications = async () => {
    const result = await categories.aggregate([
        {
            $lookup: {
                from: "publications",
                let: {
                    asNameCategory: "$name" //obtener e nombre de la categoria
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$$asNameCategory", "$categories"]
                            }
                        }
                    }
                ],
                as: "asNameCategoriesFound"
            }
        },
        {   $unwind: "$asNameCategoriesFound"},
    ]);
    console.log('******* Result ********',result);
}
ListCategoriesWithPublications();