import React, { useState } from 'react';
import './Calendario.css';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getDaysInMonth(month: number, year: number): number[] {
  const numDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => i + 1);
}

function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}

const Calendario: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const days = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null); 
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null); 
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={handlePrevMonth}>{'<'}</button>
        <span className="calendar-title">
          {new Date(currentYear, currentMonth)
            .toLocaleDateString('pt-BR', { month: 'long' })
            .charAt(0).toUpperCase() +
            new Date(currentYear, currentMonth)
              .toLocaleDateString('pt-BR', { month: 'long' }).slice(1)
          } {currentYear}
        </span>
        <button className="calendar-nav" onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day calendar-empty" />
        ))}
        {days.map(day => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
          const isSelected = day === selectedDay;

          return (
            <div
              key={day}
              className={`calendar-day${isToday ? ' calendar-today' : ''}${isSelected ? ' calendar-selected' : ''}`}
              onClick={() => handleSelectDay(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Calendario;