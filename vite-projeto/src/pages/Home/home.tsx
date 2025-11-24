import React from 'react'
import './home.css'
import Calendario from "./Calendario/Calendario"
import MeusHabitos from "./MeusHabitos/MeusHabitos"
import AdicionarHabitos from  "./AdicionarHabitos/AdicionarHabitos"

export default function Home() {
  const hoje = new Date()
  const [mesAtual, setMesAtual] = React.useState<number>(hoje.getMonth())
  const [anoAtual, setAnoAtual] = React.useState<number>(hoje.getFullYear())
  const [diaSelecionado, setDiaSelecionado] = React.useState<number | null>(hoje.getDate())

  type Habito = { title: string; done: boolean }
  const [habitosPorData, setHabitosPorData] = React.useState<Record<string, Habito[]>>(() => {
    try {
      const raw = localStorage.getItem('habitosPorData')
      if (!raw) return {}
      const parsed = JSON.parse(raw)
      // migrate old format (array of strings) to new format
      const migrated: Record<string, Habito[]> = {}
      for (const k of Object.keys(parsed)) {
        const val = parsed[k]
        if (Array.isArray(val)) {
          if (val.length === 0 || typeof val[0] === 'string') {
            migrated[k] = (val as string[]).map((t: string) => ({ title: t, done: false }))
          } else {
            migrated[k] = val as Habito[]
          }
        } else {
          migrated[k] = []
        }
      }
      return migrated
    } catch {
      return {}
    }
  })

  const chaveData = (d: number | null, m: number, y: number) => (d == null ? `${y}-${m}-null` : `${y}-${m}-${d}`)

  React.useEffect(() => {
    localStorage.setItem('habitosPorData', JSON.stringify(habitosPorData))
  }, [habitosPorData])

  const aoVoltarMes = () => {
    if (mesAtual === 0) {
      setMesAtual(11)
      setAnoAtual((y) => y - 1)
    } else {
      setMesAtual((m) => m - 1)
    }
    setDiaSelecionado(null)
  }

  const aoAvancarMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0)
      setAnoAtual((y) => y + 1)
    } else {
      setMesAtual((m) => m + 1)
    }
    setDiaSelecionado(null)
  }

  const aoSelecionarDia = (dia: number) => setDiaSelecionado(dia)

  const aoAdicionarHabito = (titulo: string) => {
    const chave = chaveData(diaSelecionado, mesAtual, anoAtual)
    setHabitosPorData((prev) => {
      const atual = prev[chave] ?? []
      return { ...prev, [chave]: [...atual, { title: titulo, done: false }] }
    })
  }

  const aoToggleHabito = (index: number) => {
    const chave = chaveData(diaSelecionado, mesAtual, anoAtual)
    setHabitosPorData((prev) => {
      const atual = prev[chave] ?? []
      if (index < 0 || index >= atual.length) return prev
      const novo = atual.map((h, i) => (i === index ? { ...h, done: !h.done } : h))
      return { ...prev, [chave]: novo }
    })
  }

  const chaveParaRender = chaveData(diaSelecionado, mesAtual, anoAtual)

  return (
    <div className="home-container">
      <div className="home-grid">
        <div className="home-left">
          <Calendario
            mesAtual={mesAtual}
            anoAtual={anoAtual}
            diaSelecionado={diaSelecionado}
            aoVoltarMes={aoVoltarMes}
            aoAvancarMes={aoAvancarMes}
            aoSelecionarDia={aoSelecionarDia}
          />
        </div>
        <div className="home-right">
              <MeusHabitos habitos={habitosPorData[chaveParaRender] ?? []} aoToggle={aoToggleHabito} />
              <AdicionarHabitos aoAdicionar={aoAdicionarHabito} />
        </div>
      </div>
    </div>
  )
}