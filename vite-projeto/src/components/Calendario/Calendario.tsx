import React, { useState } from 'react'
import './Calendario.css'


// Logica do calendario 
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function getDaysArray(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
}

export const Calendario: React.FC = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const days = getDaysArray(year, month);

  // Renderizacao do calendario
   return (
    <div className="calendar-container">
      <h3>Hoje</h3>
      <div className="calendar-header">
        <button onClick={() => setMonth(month === 0 ? 11 : month - 1)}>
          {'<'}
        </button>
        <span>{MONTHS[month]}</span>
        <button onClick={() => setMonth(month === 11 ? 0 : month + 1)}>
          {'>'}
        </button>
      </div>
      <div className="calendar-grid">
        {WEEK_DAYS.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day ${
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()
                ? 'calendar-today'
                : ''
            }`}
          >
            {day ? day : ''}
          </div>
        ))}
      </div>
    </div>
  );
};
