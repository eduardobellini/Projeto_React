
import './App.css'
import AdicionarHabito from './components/AdicionarHabitos/AdicionarHabitos'
import Calendario from './components/Calendario/Calendario'
import MeusHabitos from './components/MeusHabitos/MeusHabitos'



function App() {

  return (
    <>
      <Calendario/>
      <MeusHabitos/>
      <AdicionarHabito/>
    </>
  )
}

export default App
