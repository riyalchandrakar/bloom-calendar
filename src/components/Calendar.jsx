import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import Header from './Header';
import CalendarDay from './CalendarDay';
import ThemeSelector from './ThemeSelector';
import './Calendar.css';

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [theme, setTheme] = useState('default');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = monthStart.getDay();
  const prevMonthDays = startDay === 0 ? [] : 
    Array.from({ length: startDay }, (_, i) => 
      new Date(monthStart.getFullYear(), monthStart.getMonth(), -startDay + i + 1)
    );

  const endDay = monthEnd.getDay();
  const nextMonthDays = endDay === 6 ? [] : 
    Array.from({ length: 6 - endDay }, (_, i) => 
      new Date(monthEnd.getFullYear(), monthEnd.getMonth() + 1, i + 1)
    );

  const allDays = [...prevMonthDays, ...monthDays, ...nextMonthDays];

  const nextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDate(startOfMonth(newDate));
  };

  const prevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDate(startOfMonth(newDate));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const today = new Date();
  const selectedEvents = events.filter(event => 
    isSameDay(parseISO(event.date), selectedDate)
  );

  return (
    <div className={`calendar-app theme-${theme}`}>
      <ThemeSelector currentTheme={theme} onChangeTheme={changeTheme} />
      
      <div className="calendar-main">
        <div className="calendar-wrapper">
          <Header 
            currentDate={currentDate} 
            nextMonth={nextMonth} 
            prevMonth={prevMonth}
            goToToday={goToToday}
            theme={theme}
          />
          
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-weekday">
                {isMobile ? day.substring(0, 1) : day.substring(0, 3)}
              </div>
            ))}
            
            {allDays.map((day, i) => {
              const dayEvents = events.filter(event => 
                isSameDay(parseISO(event.date), day)
              );
              
              return (
                <CalendarDay 
                  key={i} 
                  day={day} 
                  isCurrentMonth={isSameMonth(day, currentDate)} 
                  isToday={isSameDay(day, today)} 
                  isSelected={isSameDay(day, selectedDate)}
                  events={dayEvents}
                  onClick={() => handleDateClick(day)}
                  theme={theme}
                />
              );
            })}
          </div>
        </div>

        {!isMobile && (
          <div className="calendar-events-panel">
            <h3 className="events-panel-title">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            {selectedEvents.length > 0 ? (
              <div className="events-list">
                {selectedEvents.map((event, index) => (
                  <div key={index} className="event-item">
                    <div className="event-time">
                      {format(parseISO(event.date), 'h:mm a')}
                    </div>
                    <div className="event-details">
                      <h4 className="event-title">{event.title}</h4>
                      {event.description && (
                        <p className="event-description">{event.description}</p>
                      )}
                      {event.location && (
                        <p className="event-location">
                          <i className="icon-location"></i> {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-events">
                <div className="no-events-icon">📅</div>
                <p>No events scheduled</p>
                <small>Click on a date to add events</small>
              </div>
            )}
          </div>
        )}
      </div>

      {isMobile && (
        <div className="mobile-events-drawer">
          <h3>{format(selectedDate, 'EEEE, MMMM d')}</h3>
          {selectedEvents.length > 0 ? (
            <div className="events-list">
              {selectedEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-time">{format(parseISO(event.date), 'h:mm a')}</div>
                  <div className="event-title">{event.title}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-events">
              <p>No events today</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;