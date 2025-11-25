import React, { useEffect, useState } from "react";
import "./Calendario.css";

interface CalendarioProps {
  mesAtual: number;
  anoAtual: number;
  diaSelecionado: number | null;
  aoVoltarMes: () => void;
  aoAvancarMes: () => void;
  aoSelecionarDia: (dia: number) => void;
}

const Calendario: React.FC<CalendarioProps> = ({
  mesAtual,
  anoAtual,
  diaSelecionado,
  aoVoltarMes,
  aoAvancarMes,
  aoSelecionarDia,
}) => {
  const [pokemon, setPokemon] = useState<{ nome: string; imagem: string } | null>(null);
  const [carregando, setCarregando] = useState(false);


  const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
  
  
  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();

  
  const nomeMes = new Date(anoAtual, mesAtual).toLocaleDateString("pt-BR", { 
    month: "long", year: "numeric" 
  });


  useEffect(() => {
    if (!diaSelecionado) return;

    const buscar = async () => {
      setCarregando(true);
      const id = (diaSelecionado + mesAtual * 31 + anoAtual) % 898 + 1;
      
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const dados = await res.json();
        setPokemon({
          nome: dados.name,
          imagem: dados.sprites.front_default
        });
      } catch {
        setPokemon(null);
      }
      setCarregando(false);
    };

    buscar();
  }, [diaSelecionado, mesAtual, anoAtual]);

  return (
    <div className="calendario-container">
      <div className="calendario-header">
        <button className="calendario-nav" onClick={aoVoltarMes}>
          {"<"}
        </button>
        <span className="calendario-titulo">{nomeMes}</span>
        <button className="calendario-nav" onClick={aoAvancarMes}>
          {">"}
        </button>
      </div>

      <div className="calendario-dias-semana">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
          <div key={d} className="calendario-dia-semana">{d}</div>
        ))}
      </div>

      <div className="calendario-dias">
    
        {[...Array(primeiroDia)].map((_, i) => (
          <div key={`v${i}`} className="calendario-dia calendario-vazio" />
        ))}
        
        {[...Array(totalDias)].map((_, i) => {
          const dia = i + 1;
          const selecionado = dia === diaSelecionado;
          
          return (
            <div
              key={dia}
              className={`calendario-dia ${selecionado ? "calendario-selecionado" : ""}`}
              onClick={() => aoSelecionarDia(dia)}
            >
              {dia}
            </div>
          );
        })}
      </div>

      <div className="pokemon-painel">
        {carregando && (
          <span className="pokemon-carregando">Carregando Pokémon...</span>
        )}
        {pokemon && (
          <div className="pokemon-conteudo">
            <img 
              className="pokemon-img"
              src={pokemon.imagem} 
              alt={pokemon.nome} 
            />
            <div className="pokemon-informacoes">
              <div className="pokemon-nome">{pokemon.nome}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendario;
