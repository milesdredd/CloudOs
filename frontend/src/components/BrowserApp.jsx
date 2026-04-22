import { useState } from 'react'
import './BrowserApp.css'
const BrowserApp = () => {
    const [inputUrl, setInput] = useState("https://en.wikipedia.org/wiki/Main_Page");
    const [site, setSite] = useState("https://en.wikipedia.org/wiki/Main_Page");

    return (
        <div className="appWindoww">
            <div className="toolbar">
                <div className="nav">
                    <button>back</button>
                    <button>forward</button>
                </div>
                <div className="inputs">
                    <input type="text" onChange={(e) => setInput(e.target.value)} value={inputUrl} />
                    <button type="button" onClick={() => { setSite(inputUrl) }}>Go</button>
                </div>
                <div className="opts">
                    <button type="button" onClick={() => {
                        console.log("History tab  comming soon ... ")

                    }}>History</button>

                </div>
            </div>
            <iframe className='frameWindow' src={site}></iframe>
        </div>
    )
}

export default BrowserApp