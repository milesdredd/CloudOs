import { useContext, useEffect } from 'react'
import './Desk.css'
import Bar from './Bar'
import Appmenu from './Appmenu'
import { windowDx } from './contexts/AppDrawer.jsx'
import NoteApp from './NoteApp'
import Browser from './BrowserApp.jsx'
import Calculator from './Calculator.jsx'



function desk() {
    const { AppRunData } = useContext(windowDx);
    return (

        < div className="desktop" >
            <div className="main">


                {AppRunData.notes && <NoteApp />}
                {AppRunData.browser && <Browser />}
                {AppRunData.calculator && <Calculator />}
                <Appmenu />
            </div>
            <Bar />
        </div >


    )
}

export default desk
