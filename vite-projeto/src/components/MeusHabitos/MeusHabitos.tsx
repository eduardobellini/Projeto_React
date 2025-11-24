import React from 'react';
import './MeusHabitos.css';

interface MeusHabitosProps {
  habitos: string[];
}

const MeusHabitos: React.FC<MeusHabitosProps> = ({ habitos }) => {
  return (
    <div className="my-habits-card">
      <h2 className="card-title">Meus Hábitos</h2>
      <div className="habit-list">
        {habitos.length === 0 ? (
          <div style={{ color: '#666' }}>Nenhum hábito para este dia.</div>
        ) : (
          habitos.map((label, idx) => (
            <div className="habit-item" key={idx}>
              <div className={`checkbox-custom`} />
              <span className="habit-label">{label}</span>
              <div className={`status-indicator`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeusHabitos;