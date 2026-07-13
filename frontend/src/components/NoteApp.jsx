import { useState, useEffect, Activity, cache } from 'react'
import './NoteApp.css'
import AppTray from './AppTray.jsx';
import App from '../App.jsx';

let once = 0;
const NoteApp = () => {
    async function fetchList() {
        const list = await fetch('')
    }
    const [noteList, setList] = useState([]);
    const [content, setContent] = useState("");
    const [CurrentNoteId, setCurrentNoteId] = useState(null);
    const [CurrentNoteName, setCurrentNoteName] = useState(null);
    const [newTitle, setTitle] = useState(new Date().toISOString().split("T")[0]);
    const [promptLoc, setLoc] = useState({
        x: 0,
        y: 0
    });
    const [update, setUpdate] = useState(0);
    useEffect(() => {
        const func = async () => {
            let cached = sessionStorage.getItem("notesCache");
            if (cached && once > 0) {
                console.log("retrieved from cache");
                const cache = JSON.parse(cached);
                setList(cache.list);
            }
            else {
                console.log("fetching notes ...");
                const data = await fetch("http://localhost:4060/os/notes/", { credentials: "include" });
                const notes = await data.json();
                const cache = {
                    list: notes,
                    notes: {}
                }

                sessionStorage.setItem("notesCache", JSON.stringify(cache));
                console.log("saving note list to cache");
                setList(notes);
                once++;
            }
        }
        func();

    }, [update]);
    const contentData = async (id) => {
        let cached = JSON.parse(sessionStorage.getItem("notesCache"));
        if (!cached) {
            cached = {
                list: [],
                notes: {}
            };
        }
        if (cached?.notes[id]) {
            console.log("retriving content frm cache");
            setContent(cached.notes[id].content);
            setCurrentNoteId(cached.notes[id]._id);
            setCurrentNoteName(cached.notes[id].title);

        } else {
            console.log("fetching content")
            const cntnStream = await fetch(`http://localhost:4060/os/notes/${id}`, { credentials: "include" });
            const cntnt = await cntnStream.json();
            cached.notes[id] = cntnt.contentData;
            sessionStorage.setItem("notesCache", JSON.stringify(cached));
            setContent(cntnt.contentData.content);
            setCurrentNoteId(cntnt.contentData._id);
            setCurrentNoteName(cntnt.contentData.title);
        }

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
            const data = await saved.json();
            if (data.success) {
                console.log("saved ");
            }
            sessionStorage.removeItem("notesCache");
        } catch (e) {
            console.log(e);
        }
    }
    const newNote = async () => {
        console.log("creating new note...")
        try {

            const saved = await fetch(`http://localhost:4060/os/notes/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    title: newTitle,
                    content: ""
                })
            });
            const data = await saved.json();
            if (data.success) {
                console.log(data.msg);
                setUpdate(prev => prev + 1);
                console.log("updating ui ... ")
            }
        } catch (e) {
            console.log(e);
        }
    }
    const remove = async (id) => {
        console.log("removing a note");
        try {
            const saved = await fetch(`http://localhost:4060/os/notes/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            setUpdate(prev => prev + 1);
            setCurrentNoteName(null);
            setCurrentNoteId(null);
            setContent("content removed , choose one");
        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <AppTray>
            <div className="appWindow">
                <div className="listTab">
                    <div className="allNotes">
                        {
                            noteList.map((data) => (

                                <div className="titleBox" key={data._id}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        console.log(`right clicked on ${data._id}`);
                                        setLoc({
                                            x: e.clientX - 20,
                                            y: e.clientY + 20
                                        })
                                        // const optPop = document.getElementById('option-menu');
                                        // optPop.showPopover();
                                        requestAnimationFrame(() => {
                                            document.getElementById("option-menu")?.showPopover();
                                        });



                                    }}
                                >
                                    <div className="label">
                                        <button type="button" onClick={() => {
                                            console.log("fetching content");
                                            contentData(data._id);
                                        }}> {data.title}</button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    <div className="newNotes">
                        <button className='newbtn' type="button" popoverTarget="newNotePrompt-pop"
                            onMouseDown={(e) => {
                                setLoc({
                                    x: e.clientX + 20,
                                    y: e.clientY - 80
                                })
                            }}>
                            + Add New
                        </button>

                    </div>
                </div>
                <div className="contentWindow">
                    <div className="contentctrl">
                        <div className="noteName">{CurrentNoteName}</div>
                        <button type="button" onClick={() => { saveNote(CurrentNoteId) }}>save Note</button>
                        <button type="button" popoverTarget='sureDelete' onClick={(e) => {
                            setLoc({
                                x: e.clientX - 20,
                                y: e.clientY - 20
                            })
                        }} >Delete</button>
                    </div>
                    <textarea
                        className="noteContent"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="whats on your Mind ..."

                    >

                    </textarea>
                </div>
                <div className="newNotePrompt" id="newNotePrompt-pop" popover="manual"
                    style={{
                        top: promptLoc.y,
                        left: promptLoc.x
                    }}
                >
                    <input className='input' type="text" value={newTitle} onChange={(e) => { setTitle(e.target.value) }} />
                    <div className="buttons">
                        <button className="btn" popoverTarget="newNotePrompt-pop">close</button>
                        <button className="btn" onClick={newNote} popoverTarget="newNotePrompt-pop">Create</button>
                    </div>
                </div>
                <div className="Prompt" id="option-menu" popover="auto" style={{
                    top: promptLoc.y,
                    left: promptLoc.x
                }}>
                    <div className="rename">
                        <button type="button">rename it</button>
                    </div>
                </div>
                <div className="Prompt" id="sureDelete" popover="auto"
                    style={{
                        top: promptLoc.y,
                        left: promptLoc.x
                    }}
                >
                    Are you sure u want to delete this notes permanently ?
                    <button onClick={() => { remove(CurrentNoteId) }} popoverTarget="sureDelete">Delete</button>

                </div>

            </div>
        </AppTray>
    )
}

export default NoteApp