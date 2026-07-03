import { useContext } from 'react'

import './Bar.css'
import { windowDx } from './contexts/AppDrawer';
function Bar() {

    const { setAppRunData } = useContext(windowDx);
    // ************* auto login 
    const login = async () => {
        try {

            console.log("trying to login");

            const res = await fetch("http://localhost:4060/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: "miles",
                    password: "0000"
                }),
                credentials: "include"   //  REQUIRED
            });


            const data = await res.json();

            console.log("data:", data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                console.log("Token saved to localStorage");
            }
        } catch (err) {
            console.log("login error:", err);
        }
    };
    const toggleApp = (name) => {
        setAppRunData(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };
    // *************
    return (
        <div className="bar">
            <div className="right">
                <button type="button" onClick={() => {
                    toggleApp("notes");
                }}>Notes</button>
                <button type="button" onClick={() => {
                    toggleApp("browser");
                }}>Browser</button>
            </div>

            <div className="middle">middle


                <button type="button" popoverTarget="appmenu-pop"
                >start</button>
                <button type="button" onClick={login}>login</button>

            </div>


            <div className="left">left</div>

        </div>
    )
}

export default Bar