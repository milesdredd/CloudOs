
import Desk from './components/Desk'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { WindowDxProvider } from './components/contexts/AppDrawer.jsx'
import DM from './components/DM.jsx'

function App() {


  return (
    <BrowserRouter>
      <WindowDxProvider>
        <Routes>
          <Route path="/" element={<DM />} />
          <Route path="/home" element={

            <Desk />

          } />
        </Routes>
      </WindowDxProvider>
    </BrowserRouter>

  )
}

export default App
