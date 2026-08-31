import { React, useState } from 'react'
import './AppTray.css'
function AppTray({ children, layout: { width = "60%", height = "70%" } = {} }) {
    const [x, setX] = useState(300);
    const [Y, setY] = useState(100);
    const [isDrag, Drag] = useState(false);
    const [offsetX, setOffsetX] = useState(null);
    const [offsetY, setOffsetY] = useState(null);
    // const [width, setwidth] = useState(layout.width);
    // const [height, setHeight] = useState(layout.height);

    const [Z, setZ] = useState(1);

    return (
        <div className="appWindowHandle"
            style={{
                position: "absolute",
                left: x,
                top: Y,
                zIndex: Z,
                width: width,
                height: height
            }}
            onMouseUp={() => { Drag(false) }}
            onMouseDown={() => { setZ((prev) => prev + 1) }}
            onMouseMove={(e) => {
                if (isDrag) {

                    setX(e.clientX - offsetX);
                    setY(e.clientY - offsetY - 10);
                }

            }}
        >
            <div className="header"
                onMouseUp={() => { Drag(false) }}
                onMouseDown={(e) => {
                    Drag(true);
                    setOffsetX(e.clientX - x);
                    setOffsetY(e.clientY - Y);
                }}
            >

                <div className="title"></div>
                <div className="btns">
                    <div className="btn close"></div>
                    <div className="btn minimize"></div>
                    <div className="btn maximize"></div>
                </div>
            </div>
            <div className="contentbox">{children}</div>
        </div>
    )
}

export default AppTray