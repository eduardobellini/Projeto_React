
import { Card } from "antd";
import 'antd/dist/reset.css';
import "./contato.css";

export default function Contato() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "#f0f2f5",
      }}
    >
      
      <Card
        className="contato-card"
        title={<h2 className="card-title">Email</h2>}
      >
        <p className="card-text">habittracker@meuprojeto.com</p>
      </Card>

      <Card
        className="contato-card"
        title={<h2 className="card-title">Outros Contatos</h2>}
      >
        <p className="card-text">WhatsApp: (83) 4002-8922</p>
        <p className="card-text">João Pessoa - PB</p>
      </Card>
    </div>
  );
}