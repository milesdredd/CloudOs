import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import User from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config();
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cloudOs");

    const oldUser = await User.find({
        userid: { $exists: true }
    });


    console.log(`${oldUser.length} old user found ...`);
    for (const user of oldUser) {
        const gen = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 7)
        user.userid = gen();
        await user.save();
    }
} catch (err) {
    console.log(err);
}
finally {
    console.log("done..");
    await mongoose.disconnect();
}