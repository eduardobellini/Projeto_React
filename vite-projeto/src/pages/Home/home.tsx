import React from 'react'
import Calendario from "./Calendario/Calendario"
import MeusHabitos from "./MeusHabitos/MeusHabitos"
import AdicionarHabitos from  "./AdicionarHabitos/AdicionarHabitos"

export default function Home() {
  const hoje = new Date()
  const [mesAtual, setMesAtual] = React.useState<number>(hoje.getMonth())
  const [anoAtual, setAnoAtual] = React.useState<number>(hoje.getFullYear())
  const [diaSelecionado, setDiaSelecionado] = React.useState<number | null>(hoje.getDate())

  const [habitosPorData, setHabitosPorData] = React.useState<Record<string, string[]>>(() => {
    try {
      const raw = localStorage.getItem('habitosPorData')
      return raw ? JSON.parse(raw) : {}
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
      return { ...prev, [chave]: [...atual, titulo] }
    })
  }

  const chaveParaRender = chaveData(diaSelecionado, mesAtual, anoAtual)

  return (
    <>
      <Calendario
        mesAtual={mesAtual}
        anoAtual={anoAtual}
        diaSelecionado={diaSelecionado}
        aoVoltarMes={aoVoltarMes}
        aoAvancarMes={aoAvancarMes}
        aoSelecionarDia={aoSelecionarDia}
      />
      <MeusHabitos habitos={habitosPorData[chaveParaRender] ?? []} />
      <AdicionarHabitos aoAdicionar={aoAdicionarHabito} />
    </>
  )
}