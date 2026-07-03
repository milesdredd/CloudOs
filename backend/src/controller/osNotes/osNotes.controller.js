
import { Notesdb } from "../../model/osNotes.model.js";
async function getNotesList(req, res) {
    try {
        console.log("getting all users ...")
        const userId = req.user.userId;
        const data = await Notesdb.find({ userId: userId });
        // const allTitles =await data.json();
        return res
            .status(200)
            .json(data);
    } catch (e) {
        return res.status(500).json({ error: "Failed to fetch notes" });
    }


}

async function getContent(req, res) {
    try {
        console.log("asked for content ");
        const userId = req.user.userId;
        const NotesId = req.params.id;
        const contentData = await Notesdb.findOne({
            _id: NotesId,
            userId: userId
        })

        res.status(200).json({ success: true, contentData });
    } catch (e) {
        res.status(500).json({ success: false, msg: e.message })
    }
}
async function NewTitle(req, res) {
    const { title } = req.body;
    const userId = req.user.userId;
    try {
        await Notesdb.create({
            title: title,

            userId: userId,
        });
        return res.json({ success: true, msg: "new note created" });
    } catch (e) {
        return res.json({ success: false, msg: "something wnet wrong" });
    }
}
async function addContent(req, res) {
    console.log("updating notes")
    const { content } = req.body;
    const NotesId = req.params.id;
    const userId = req.user.userId;
    try {
        await Notesdb.findOneAndUpdate({
            _id: NotesId,
            userId: userId
        }, {
            content: content
        }, {
            new: false
        });
        return res.json({ success: true, msg: "updated notes successfully" });
    } catch (e) {
        console.log(e.message);
        return res.json({ success: false, msg: "something went wrong" });
    }
}
async function addNotes(req, res) {

    const { title, content, markdown = false } = req.body;
    const userId = req.user.userId;

    try {
        await Notesdb.create({
            title,
            content,
            markdown,
            userId
        });
        return res.json({ success: true, msg: "added notes successfully" });
    } catch (err) {
        //return res.json({ success: false, msg: "something went wrong", error: err.message });
        return res.json({
            success: false,
            msg: "something went wrong",
            error: err.message
        });
    }

}
async function removeNote(req, res) {
    const userId = req.user.userId;
    const noteId = req.params.id;
    try {
        const result = await Notesdb.deleteOne({
            _id: noteId,
            userId: userId
        });
        if (result.deletedCount) {
            res.json({ success: true, msg: "note remove" });
        }

    } catch (e) {
        res.json({ success: false, msg: "no change !" });
    }

}

export { NewTitle, addContent, addNotes, removeNote, getNotesList, getContent };