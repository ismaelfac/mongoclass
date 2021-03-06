const mongoose = require('mongoose');
const { users } = require('./model/User');
const { publications } = require('./model/Publication');
const { categories } = require('./model/Category');
const { mongo } = require('./databases/config');


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
            categories: ["Salud"],
            likes: '20',
            isActive: true
        },
        {
            title: 'Post 2',
            description: 'Description Post 2',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c380"),
            categories: ["Tech"],
            likes: '40',
            isActive: true
        },
        {
            title: 'Post 3',
            description: 'Description Post 3',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c381"),
            categories: ["Salud"],
            likes: '10',
            isActive: false
        },
        {
            title: 'Post 4',
            description: 'Description Post 4',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c381"),
            categories: ["Tech"],
            likes: '30',
            isActive: true
        },
        {
            title: 'Post 5',
            description: 'Description Post 5',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c380"),
            categories: ["Salud"],
            likes: '60',
            isActive: true
        },
        {
            title: 'Post 6',
            description: 'Description Post 6',
            author: mongoose.Types.ObjectId("60edcd88c4546228ece1c380"),
            categories: ["Tech"],
            likes: '50',
            isActive: false
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
                    asNameCategory: "$name" //obtener el nombre de la categoria
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
//ListCategoriesWithPublications();

// :CANALIZACION POR TUBERIAS
const FilterPublicationsWithStatesAndOptions = async () => {
    const result = await publications.aggregate([
        {
            $match: { isActive: true }
        },
        { $group: { _id: "$author", totalLikes: { $sum: "$likes" } } }
    ]);
    console.log('******* Result ********',result);
}

//FilterPublicationsWithStatesAndOptions();

//: METODO DE AGREGACION DE PROPOSITO UNICO

const FilterPublicationsWithStateActiveAndOptions = async () => {
    const result = await publications.distinct('title', {
        author: mongoose.Types.ObjectId("60edcd88c4546228ece1c37f")
    });
    console.log('****** Result ***********',result);
}
FilterPublicationsWithStateActiveAndOptions();