import React, { useState } from "react";
import "./AdicionarHabitos.css"

interface Props {
  aoAdicionar: (titulo: string) => void;
}

export default function AdicionarHabito({ aoAdicionar }: Props) {
  const [titulo, setTitulo] = useState("");

  const adicionarHabito = () => {
    if (titulo.trim() === "") return;
    aoAdicionar(titulo.trim());
    setTitulo("");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Adicionar Novo Hábito</h2>

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <button onClick={adicionarHabito}>Adicionar</button>
      </div>
    </div>
  );
}
