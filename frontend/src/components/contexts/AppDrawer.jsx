import { createContext, useState } from "react";


export const windowDx = createContext(null);

export function WindowDxProvider({ children }) {
    const [AppRunData, setAppRunData] = useState({
        notes: false,
        browser: false,
        calculator: false
    });
    return (
        <windowDx.Provider value={{ AppRunData, setAppRunData }}>
            {children}
        </windowDx.Provider>
    );
}   