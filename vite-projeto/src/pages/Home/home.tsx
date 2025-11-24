import Calendario from "./Calendario/Calendario"
import MeusHabitos from "./MeusHabitos/MeusHabitos"
import AdicionarHabitos from  "./AdicionarHabitos/AdicionarHabitos"

export default function Home() {
  return (
    <>
      <Calendario />
      <MeusHabitos />
      <AdicionarHabitos />
    </>
  )
}