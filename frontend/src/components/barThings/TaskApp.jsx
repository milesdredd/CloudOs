import React, { useContext } from 'react'
import './TaskApps.css'
import { windowDx } from '../contexts/AppDrawer.jsx';

export function TaskApp({ appName, icon }) {
    const { setAppRunData } = useContext(windowDx);
    const toggleApp = (appName, type) => {

        console.log(`opening ${appName}`)
        setAppRunData(prev => ({
            ...prev,
            [appName]: !prev[appName]
        }));
    };
    return (
        <div>
            <button className='jb taskbarIcon' type="button" onClick={() => {
                toggleApp(appName);
            }}>
                {icon}
            </button>
        </div>
    )
}
export function TaskPop({ PopName, icon }) {
    return (
        <div>
            <button className='taskbarIcon jb' type="button" popoverTarget={PopName}>
                {icon}
            </button>
        </div >
    )
}

