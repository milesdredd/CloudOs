import mongo from 'mongoose';
import { customAlphabet } from "nanoid";
const gen = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 7)
const userSchema = new mongo.Schema({

    userid: {
        type: String,
        unique: true,
        default: () => gen()
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "member"
    },
    profile: {
        type: String,
        default: null
    }
},
    {
        timestamps: true
    }

);

const User = mongo.model("User", userSchema);
export default User;
