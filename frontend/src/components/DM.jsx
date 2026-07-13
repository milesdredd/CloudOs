import { React, useState, useEffect } from 'react'
import './DM.css'
const DM = () => {
    const [username, setUsr] = useState("miles");
    const [pass, setPass] = useState("0000");
    const [user, setUser] = useState("");
    const [loggedIn, setInfo] = useState(false);
    const [pfp, setPfp] = useState(null);
    useEffect(() => {
        console.log("running effect")
        const func = async () => {
            const res = await fetch("http://localhost:4060/auth/token", { credentials: "include" });


            const data = await res.json();

            if (!data.success) {
                console.log("No valid token");
                return;
            }

            if (data) {
                localStorage.setItem("token", data.token);
                console.log("looggin via token")
                setInfo(true);
                setUser(data.Info.email);
                //  setPfp(data.Info.profile);
            } else {
                console.log("N/A tooken")
            }
        }
        func();

    }, []);
    const handleLogin = async () => {
        try {

            console.log("trying to login");

            const res = await fetch("http://localhost:4060/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: username,
                    password: pass
                }),
                credentials: "include"   //  REQUIRED
            });


            const data = await res.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                console.log("Token saved to localStorage");
                setInfo(true);
                setUser(data.Info.email);
                // setPfp(data.Info.profile);
            } else {
                console.log(`error occured: ${data.reply}`)
            }
        } catch (err) {
            console.log("login error:", err);
        }
    };
    return (
        <div className="frame">
            <div className="cover">
                <div className="pfp">pfp</div>
                <div className="logins">
                    <span>username:</span>
                    <input type="text" defaultValue={"miles"} onChange={(e) => { setUsr(e.target.value); console.log(username) }} />
                    <br />
                    <span>password:</span>
                    <input type="text" defaultValue={"0000"} onChange={(e) => { setPass(e.target.value); console.log(pass) }} />
                    <button onClick={handleLogin}>login</button>
                </div>

            </div>
        </div>
    )
}

export default DM