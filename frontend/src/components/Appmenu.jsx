import { useEffect, useState } from 'react'
import './Appmenu.css'
const Appmenu = () => {
    const [Apps, setApps] = useState([]);

    useEffect(() => {
        const allApp = async () => {

            try {
                console.log("asking for app ... ")
                const res = await fetch("http://localhost:4060/os/apps/appList", { credentials: "include" });
                const data = await res.json();
                console.log(data);
                if (!data.success) {

                    console.log(data.reply);
                }
                else {
                    setApps(data);
                }

            } catch (e) {
                console.log("❌APPLIST API failed" + e.messgage);
            }

        }
        allApp();



    }, []);
    return (

        <div className="appmenu" popover="auto" id="appmenu-pop">
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