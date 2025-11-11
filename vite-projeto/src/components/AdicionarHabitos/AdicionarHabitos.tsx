import React, { useState } from "react";
import "./AdicionarHabitos.css"


export default function AdicionarHabito() {
  const [titulo, setTitulo] = useState("");
  const [habitos, setHabitos] = useState<string[]>([]);


  const adicionarHabito = () => {
    if (titulo.trim() === "") return;
    setHabitos([...habitos, titulo]);
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


        {habitos.length > 0 && (
          <ul>
            {habitos.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
