import React from 'react';
import './MeusHabitos.css';

interface Habito {
  title: string;
  done: boolean;
}

interface MeusHabitosProps {
  habitos: Habito[];
  aoToggle?: (index: number) => void;
}

const MeusHabitos: React.FC<MeusHabitosProps> = ({ habitos, aoToggle }) => {
  return (
    <div className="my-habits-card">
      <h2 className="card-title">Meus Hábitos</h2>
      <div className="habit-list">
        {habitos.length === 0 ? (
          <div style={{ color: '#666' }}>Nenhum hábito para este dia.</div>
        ) : (
          habitos.map((hab, idx) => (
            <div
              className="habit-item"
              key={idx}
              role={aoToggle ? 'button' : undefined}
              onClick={() => aoToggle && aoToggle(idx)}
            >
              <div className={`checkbox-custom ${hab.done ? 'checked' : ''}`} />
              <span className="habit-label" style={{ textDecoration: hab.done ? 'line-through' : 'none' }}>{hab.title}</span>
              <div className={`status-indicator ${hab.done ? 'active' : ''}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeusHabitos;