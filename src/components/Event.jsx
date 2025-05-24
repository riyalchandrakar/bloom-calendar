import { format, parseISO } from 'date-fns';
import './Event.css';

const Event = ({ event }) => {
  const startTime = format(parseISO(event.date), 'h:mm a');
  const endTime = event.endTime ? format(parseISO(event.endTime), 'h:mm a') : '';
  const timeRange = endTime ? `${startTime} - ${endTime}` : startTime;

  return (
    <div 
      className={`event ${event.color || 'default'}`}
      style={{ 
        '--event-color': event.color || '#4a6cf7',
        '--event-color-light': event.color ? `${event.color}20` : '#4a6cf720'
      }}
      title={`${event.title}\n${timeRange}${event.location ? `\nLocation: ${event.location}` : ''}`}
    >
      <div className="event-time">{timeRange}</div>
      <div className="event-content">
        <h4 className="event-title">{event.title}</h4>
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
        {event.location && (
          <div className="event-location">
            <svg className="location-icon" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {event.location}
          </div>
        )}
      </div>
      {event.priority && (
        <div className={`priority-badge priority-${event.priority}`}>
          {event.priority === 'high' ? '❗' : event.priority === 'medium' ? '🔸' : '🔹'}
        </div>
      )}
    </div>
  );
};

export default Event;