import mongo from "mongoose";
const friendSchema = new mongo.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,

    }

})