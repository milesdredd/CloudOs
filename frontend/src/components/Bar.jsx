import { useContext } from 'react'
import { TaskApp, TaskPop } from './barThings/TaskApp.jsx';
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
                <TaskApp appName="notes" icon="󱩽" />
                <TaskApp appName="browser" icon="󰀳" />
                <TaskApp appName="calculator" icon="" />
            </div>

            <div className="middle">
                <TaskPop PopName="appmenu-pop" icon="" />
                <button className='taskbarIcon jb' type="button" onClick={login}></button>

            </div>


            <div className="left">
                <TaskApp appName="github" icon="" />
                <TaskApp appName="friends" icon="󰀏" />
                <TaskApp appName="finder" icon="󰀖" />
                <TaskApp appName="internet" icon="󰤥" />
                <TaskApp appName="battery-app" icon="" />
            </div>

        </div>
    )
}

export default Bar