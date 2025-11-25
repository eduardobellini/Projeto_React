import React, { useEffect, useState } from "react";
import "./Calendario.css";

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const obterDiasDoMes = (mes: number, ano: number): number[] => {
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  return Array.from({ length: totalDias }, (_, i) => i + 1);
};

const obterPrimeiroDiaDoMes = (mes: number, ano: number): number => 
  new Date(ano, mes, 1).getDay();

const obterIdPokemon = (dia: number, mes: number, ano: number) => 
  (dia + (mes + 1) * 31 + ano) % 898 + 1;

const formatarMesAno = (mes: number, ano: number) => {
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
  const hoje = new Date();
  const [pokemon, setPokemon] = useState<{
    nome: string;
    imagem: string | null;
  } | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [erroImagem, setErroImagem] = useState(false);
  
  const dias = obterDiasDoMes(mesAtual, anoAtual);
  const primeiroDia = obterPrimeiroDiaDoMes(mesAtual, anoAtual);

  // Usa proxy para evitar rate limiting do GitHub
  const obterUrlComProxy = (url: string): string => {
    if (url.includes('raw.githubusercontent.com')) {
      return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  useEffect(() => {
    if (diaSelecionado == null) return;
    
    const controlador = new AbortController();
    
    const buscarPokemon = async () => {
      try {
        setCarregando(true);
        setErro(null);
        setErroImagem(false);
        
        const id = obterIdPokemon(diaSelecionado, mesAtual, anoAtual);
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          signal: controlador.signal,
        });
        
        if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
        
        const dados = await resposta.json();
        const idPokemon = dados.id || id;
        const urlImagem = dados?.sprites?.front_default || 
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
        
        setPokemon({
          nome: dados.name,
          imagem: urlImagem,
        });
      } catch (e: unknown) {
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }
        setErro("Falha ao carregar Pokémon");
        setPokemon(null);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarPokemon();
    return () => controlador.abort();
  }, [diaSelecionado, mesAtual, anoAtual]);

  const urlImagemComProxy = pokemon?.imagem ? obterUrlComProxy(pokemon.imagem) : null;

  return (
    <div className="calendario-container">
      <div className="calendario-header">
        <button className="calendario-nav" onClick={aoVoltarMes}>
          {"<"}
        </button>
        <span className="calendario-titulo">
          {formatarMesAno(mesAtual, anoAtual) || `${mesAtual + 1}/${anoAtual}`}
        </span>
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
        {dias.map((dia) => {
          const ehHoje =
            dia === hoje.getDate() &&
            mesAtual === hoje.getMonth() &&
            anoAtual === hoje.getFullYear();
          const estaSelecionado = dia === diaSelecionado;

          return (
            <div
              key={dia}
              className={`calendario-dia${ehHoje ? " calendario-hoje" : ""}${
                estaSelecionado ? " calendario-selecionado" : ""
              }`}
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
        {!carregando && erro && (
          <span className="pokemon-erro">{erro}</span>
        )}
        {!carregando && !erro && pokemon && (
          <div className="pokemon-conteudo">
            {pokemon.imagem && !erroImagem ? (
              <img
                className="pokemon-img"
                src={urlImagemComProxy || pokemon.imagem}
                alt={pokemon.nome}
                onError={() => setErroImagem(true)}
                onLoad={() => setErroImagem(false)}
              />
            ) : (
              <div className="pokemon-sem-imagem">Sem imagem</div>
            )}
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
