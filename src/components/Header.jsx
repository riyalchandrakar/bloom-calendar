import { format } from 'date-fns';
import './Calendar.css';

const Header = ({ currentDate, prevMonth, nextMonth, goToToday, theme }) => {
  return (
    <div className="calendar-header">
      <div className="header-left">
        <h2 className="calendar-title">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="header-center">
        <button 
          className="today-button"
          onClick={goToToday}
        >
          Today
        </button>
      </div>
      <div className="header-right">
        <button 
          className="calendar-nav-button"
          onClick={prevMonth}
          aria-label="Previous month"
        >
          &lt;
        </button>
        <button 
          className="calendar-nav-button"
          onClick={nextMonth}
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Header;