import { createContext, useState } from "react";

export const windowDx = createContext(null);

export function WindowDxProvider({ children }) {
    const [AppRunData, setAppRunData] = useState({
        appmenu: false,
        notes: false,
        browser: false
    });
    return (
        <windowDx.Provider value={{ AppRunData, setAppRunData }}>
            {children}
        </windowDx.Provider>
    );
}   