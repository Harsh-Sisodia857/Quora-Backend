const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const connectDatabase = () => {
    mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`Mongodb connected with server`);
        }).catch((err) => {
            console.log(err);
        });
};
module.exports = connectDatabase;