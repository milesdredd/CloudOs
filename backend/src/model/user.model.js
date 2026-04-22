import mongo from 'mongoose';

const userSchema = new mongo.Schema({
    // username: {
    //     type: String,
    //     unique: true,
    //     required: true
    // },
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
