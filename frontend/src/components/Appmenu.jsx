import { useEffect, useState } from 'react'
import './Appmenu.css'
const Appmenu = () => {
    const [Apps, setApps] = useState([]);

    useEffect(() => {
        const allApp = async () => {

            try {
                const res = await fetch("http://localhost:4060/os/apps/appList", { credentials: "include" });
                const data = await res.json();
                setApps(data);

            } catch (e) {
                console.log("❌APPLIST API failed" + e.messgage);
            }

        }
        allApp();

    }, []);
    return (
        <div className="appmenu">
            {
                Apps?.map((app) => (
                    <div className="app" key={app._id}>
                        <div className="icon">
                            <img src={app.Icon} alt={app.Name} />
                        </div>
                        <div className="label">{app.Name}</div>
                    </div>

                ))
            }
        </div>
    )
}

export default Appmenu