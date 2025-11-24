import { Card } from "antd";

export default function Sobre() {
    return (
        <div 
            style={{ 
                display: "flex",
                justifyContent: "center",
                padding: "20px",
            }}
        >

            <div 
                style={{
                    maxWidth: "600px",
                    width: "100%",
                }}
            >

                <Card 
                    title="Sobre a Habit Tracker"
                    style={{
                        borderRadius: "12px",
                        padding: "16px",
                        background: "#ffffffee",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        
                    }}
                >
                    <p style={{ 
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#333",
                        textAlign: "justify"
                    }}> 
                        Com o objetivo de oferecer um ambiente de organização de hábitos e desenvolvimento pessoal, a&nbsp;
                        <b>Habit Tracker</b> te oferece praticidade e companheirismo diário para uma rotina saudável!
                    </p>
                </Card>

            </div>
        </div>
    );
}
