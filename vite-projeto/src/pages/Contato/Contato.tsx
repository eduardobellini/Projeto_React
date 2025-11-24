import "./contato.css"
import { Card } from "antd";

export default function Contato() {
    return (
        <div className="contato-container">
            <h2>Quer entrar em contato?</h2>

            <div className="cards-wrapper">

                
                <Card title="Email" className="contato-card">
                    <p>habittracker@meuprojeto.com</p>
                    
                </Card>

                <Card title="Outros Contatos" className="contato-card">
                    <p> WhatsApp: (83) 4002-8922</p>
                    <p> João Pessoa - PB</p>
                </Card>
                

            </div>
        </div>
    );
}

