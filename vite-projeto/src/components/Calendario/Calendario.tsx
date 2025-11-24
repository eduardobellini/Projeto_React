import React, { useEffect, useState } from "react";
import "./Calendario.css";


const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const obterDiasDoMes = (mes: number, ano: number): number[] => {
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  return Array.from({ length: totalDias }, (_, i) => i + 1);
};
const obterPrimeiroDiaDoMes = (mes: number, ano: number): number => new Date(ano, mes, 1).getDay();
const obterIdPokemon = (dia: number, mes: number, ano: number) => (dia + (mes + 1) * 31 + ano) % 898 + 1;
const ehAbort = (e: unknown) => !!(e && typeof e === "object" && "name" in e && (e as { name?: string }).name === "AbortError");
const mesAnoFormatado = (mes: number, ano: number) => {
  const nomeMes = new Date(ano, mes).toLocaleDateString("pt-BR", { month: "long" });
  return `${nomeMes.charAt(0).toUpperCase()}${nomeMes.slice(1)} ${ano}`;
};

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
  const today = new Date();
  const [pokemon, setPokemon] = useState<{
    name: string;
    sprite: string | null;
  } | null>(null);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [pokemonError, setPokemonError] = useState<string | null>(null);
  const dias = obterDiasDoMes(mesAtual, anoAtual);
  const primeiroDia = obterPrimeiroDiaDoMes(mesAtual, anoAtual);

  useEffect(() => {
    if (diaSelecionado == null) return;
    const controller = new AbortController();
    const fetchPokemon = async () => {
      try {
        setLoadingPokemon(true);
        setPokemonError(null);
        const id = obterIdPokemon(diaSelecionado, mesAtual, anoAtual);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPokemon({
          name: data.name,
          sprite: data?.sprites?.front_default ?? null,
        });
      } catch (e: unknown) {
        if (ehAbort(e)) {
          return;
        }
        setPokemonError("Falha ao carregar Pokémon");
        setPokemon(null);
      } finally {
        setLoadingPokemon(false);
      }
    };
    fetchPokemon();
    return () => controller.abort();
  }, [diaSelecionado, mesAtual, anoAtual]);

  return (
    <div className="calendario-container">
      <div className="calendario-header">
        <button className="calendario-nav" onClick={aoVoltarMes}>
          {"<"}
        </button>
        <span className="calendario-titulo">{mesAnoFormatado(mesAtual, anoAtual)}</span>
        <button className="calendario-nav" onClick={aoAvancarMes}>
          {">"}
        </button>
      </div>
      <div className="calendario-dias-semana">
        {diasDaSemana.map((dia) => (
          <div key={dia} className="calendario-dia-semana">
            {dia}
          </div>
        ))}
      </div>
      <div className="calendario-dias">
        {Array.from({ length: primeiroDia }).map((_, i) => (
          <div key={`vazio-${i}`} className="calendario-dia calendario-vazio" />
        ))}
        {dias.map((day) => {
          const isToday =
            day === today.getDate() &&
            mesAtual === today.getMonth() &&
            anoAtual === today.getFullYear();
          const isSelected = day === diaSelecionado;

          return (
            <div
              key={day}
              className={`calendario-dia${isToday ? " calendario-hoje" : ""}${
                isSelected ? " calendario-selecionado" : ""
              }`}
              onClick={() => aoSelecionarDia(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="pokemon-painel">
        {loadingPokemon && (
          <span className="pokemon-carregando">Carregando Pokémon...</span>
        )}
        {!loadingPokemon && pokemonError && (
          <span className="pokemon-erro">{pokemonError}</span>
        )}
        {!loadingPokemon && !pokemonError && pokemon && (
          <div className="pokemon-conteudo">
            {pokemon.sprite ? (
              <img
                className="pokemon-img"
                src={pokemon.sprite}
                alt={pokemon.name}
              />
            ) : (
              <div className="pokemon-sem-imagem">Sem imagem</div>
            )}
            <div className="pokemon-informacoes">
              <div className="pokemon-nome">{pokemon.name}</div>
            </div>
          </div>
        )}
        {!loadingPokemon && !pokemonError && !pokemon && null}
      </div>
    </div>
  );
};

export default Calendario;
