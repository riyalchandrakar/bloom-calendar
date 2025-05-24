import { format } from 'date-fns';
import './CalendarDay.css';

const CalendarDay = ({ day, isCurrentMonth, isToday, isSelected, events = [], onClick }) => {
  const dayNumber = format(day, 'd');
  const hasEvents = events.length > 0;
  const eventColors = events.slice(0, 3).map(event => event.color || '#4a6cf7');

  return (
    <div
      className={`calendar-day 
        ${isCurrentMonth ? 'current-month' : 'other-month'} 
        ${isToday ? 'today' : ''} 
        ${isSelected ? 'selected' : ''}
        ${hasEvents ? 'has-events' : ''}`}
      onClick={onClick}
      aria-selected={isSelected}
    >
      <div className="day-number-container">
        <span className="day-number">{dayNumber}</span>
        {isToday && !isSelected && <span className="today-indicator"></span>}
      </div>
      
      {hasEvents && (
        <div className="day-events-indicator">
          {eventColors.map((color, i) => (
            <span 
              key={i} 
              className="event-dot" 
              style={{ backgroundColor: color }}
            />
          ))}
          {events.length > 3 && (
            <span className="more-events">+{events.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;