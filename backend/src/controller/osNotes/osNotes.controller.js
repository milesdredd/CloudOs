import pool from "../../db/postgres.js";
// import { Notesdb } from "../../model/osNotes.model.js";
async function getNotesList(req, res) {
    try {

        const userId = req.user.userId;
        console.log(`${userId} need note list, providing ..`);
        console.log("before query");
        const result = await pool.query(
            `SELECT id AS _id,title FROM notes WHERE userid=$1`, [userId]

        );
        console.log("after query", result.rows);

        const data = result.rows;


        return res
            .status(200)
            .json(data);
    } catch (e) {
        return res.status(500).json({ error: `Failed to fetch notes error : ${e}` });
    }


}

async function getContent(req, res) {
    try {
        console.log("asked for content ");
        const userId = req.user.userId;
        const NotesId = req.params.id;
        console.log("fetching fom databse ...")
        console.log(`fetching content of ${NotesId} from ${userId}`);
        const result = await pool.query(
            `SELECT id,title,content FROM notes WHERE userid = $1 AND id=$2`, [userId, NotesId]
        )
        console.log("queue finished...")
        const contentData = result.rows;
        res.status(200).json({ success: true, contentData });
    } catch (e) {
        res.status(500).json({ success: false, msg: e.message })
    }
}
async function NewTitle(req, res) {
    const { title } = req.body;
    const userId = req.user.userId;
    console.log("feeding new entry .. ")
    try {
        await pool.query(
            `INSERT INTO notes (title,userid) VALUES ($1,$2)`, [title, userId]
        )
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