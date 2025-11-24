
import './App.css'
import AdicionarHabito from './components/AdicionarHabitos/AdicionarHabitos'
import Calendario from './components/Calendario/Calendario'
import MeusHabitos from './components/MeusHabitos/MeusHabitos'



function App() {

  return (
    <div className="app-root">
      <div className="app-layout">
        <aside className="left-column">
          <Calendario />
        </aside>
        <main className="right-column">
          <MeusHabitos />
          <AdicionarHabito />
        </main>
      </div>
    </div>
  );
}

export default App
