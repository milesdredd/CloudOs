
import Desk from './components/Desk'
import './App.css'
import { WindowDxProvider } from './components/contexts/AppDrawer.jsx'
import DM from './components/DM.jsx'

function App() {


  return (
    <>
      <DM />
      {/* <WindowDxProvider>
        <Desk />
      </WindowDxProvider> */}
    </>
  )
}

export default App
