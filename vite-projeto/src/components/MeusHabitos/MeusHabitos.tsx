import React from 'react';
import './MeusHabitos.css';

interface HabitItemProps {
  label: string;
  isChecked: boolean;
  onToggle: (label: string) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ label, isChecked, onToggle }) => {
  return (
    <div className="habit-item" onClick={() => onToggle(label)}>
      <div className={`checkbox-custom ${isChecked ? 'checked' : ''}`}>
        {isChecked && (
          <svg className="check-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.54,18.99L3.06,12.51L4.66,10.91L9.54,15.79L19.34,6L20.94,7.6L9.54,18.99Z" />
          </svg>
        )}
      </div>
      <span className="habit-label">{label}</span>
      <div className={`status-indicator ${isChecked ? 'active' : ''}`}></div>
    </div>
  );
};

const MeusHabitos: React.FC = () => {
  const [habits, setHabits] = React.useState([
    { label: 'Beber água', isChecked: true },
    { label: 'Estudar', isChecked: false },
    { label: 'Exercitar', isChecked: false },
  ]);

  const handleToggleHabit = (labelToToggle: string) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.label === labelToToggle
          ? { ...habit, isChecked: !habit.isChecked }
          : habit
      )
    );
  };

  return (
    <div className="my-habits-card">
      <h2 className="card-title">Meus Hábitos</h2>
      <div className="habit-list">
        {habits.map((habit) => (
          <HabitItem
            key={habit.label}
            label={habit.label}
            isChecked={habit.isChecked}
            onToggle={handleToggleHabit}
          />
        ))}
      </div>
    </div>
  );
};

export default MeusHabitos;