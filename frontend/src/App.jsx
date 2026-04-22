
import Desk from './components/Desk'
import './App.css'
import { WindowDxProvider } from './components/contexts/AppDrawer.jsx'

function App() {


  return (
    <>
      <WindowDxProvider>
        <Desk />
      </WindowDxProvider>
    </>
  )
}

export default App
