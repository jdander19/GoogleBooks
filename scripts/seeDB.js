const mongoose = require("mongoose");
const db = require("../models");

//This file empties the Items & Users collections and inserts the items & users below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/googlebooks",
    { useNewUrlParser: true }
);

const itemSeed = [
    {
        title: " ",
        subtitle: " ",
        authors: " ",
        link: "",
        description: "",
        image: "",
        googleId: ""
    },
    {
        title: " ",
        subtitle: " ",
        authors: " ",
        link: "",
        description: "",
        image: "",
        googleId: ""
    },
];

db.Book.remove({})
    .then(() => db.Book.collection.insertMany(itemSeed))
    .then((data) => {
        console.log(data.result.n + " records inserted!");
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
