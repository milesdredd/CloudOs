import mongo from "mongoose";
const NotesSchema = new mongo.Schema({
    title: {
        type: String,
        required: true,
        unique: true,

    },
    content: {
        type: String,
        default: "",
    },
    markdown: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongo.Schema.Types.ObjectId,
        required: true,


    }
}, { timestamps: true })

const Notesdb = mongo.model("Notes", NotesSchema);
export { Notesdb };