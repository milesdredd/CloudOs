import { useState, useEffect, Activity } from 'react'
import './NoteApp.css'
const NoteApp = () => {
    async function fetchList() {
        const list = await fetch('')

    }
    const [noteList, setList] = useState([]);
    const [content, setContent] = useState("content here");
    const [CurrentNoteId, setCurrentNoteId] = useState(null);
    const [CurrentNoteName, setCurrentNoteName] = useState(null);
    useEffect(() => {
        const func = async () => {
            const data = await fetch("http://localhost:4060/os/notes/", { credentials: "include" });
            if (!data.ok) {
                console.log("API failed");
                return;
            }
            const notes = await data.json();
            setList(notes);
        }
        func();

    }, []);
    const contentData = async (id) => {
        const cntnStream = await fetch(`http://localhost:4060/os/notes/${id}`, { credentials: "include" });
        const cntnt = await cntnStream.json();
        console.log(cntnt);
        setContent(cntnt.contentData.content);
        setCurrentNoteId(cntnt.contentData._id);
        setCurrentNoteName(cntnt.contentData.title);

    }
    const saveNote = async (id) => {
        console.log("saving current note...")
        try {

            const saved = await fetch(`http://localhost:4060/os/notes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    content: content,
                })
            });
            const data = saved.json();
            if (data.ok) {
                console.log("saved ");
            }
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="appWindow">
            <div className="listTab">
                {
                    noteList.map((data) => (

                        <div className="titleBox" key={data._id}>
                            <div className="label">
                                <button type="button" onClick={() => {
                                    console.log("fetching content")
                                    contentData(data._id);
                                }}> {data.title}</button>
                            </div>
                        </div>

                    ))
                }
            </div>
            <div className="contentWindow">
                <div className="contentctrl">
                    <div className="noteName">{CurrentNoteName}</div>
                    <button type="button" onClick={() => { saveNote(CurrentNoteId) }}>save Note</button>
                </div>
                <textarea
                    className="noteContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your notes..."

                >

                </textarea>
            </div>

        </div>
    )
}

export default NoteApp