import { useState } from 'react';
import Calendar from './components/Calendar';
import eventsData from './data/events.json';
import './App.css'; // Make sure you're importing your CSS

function App() {
  const [events] = useState(eventsData);

  return (
    <div className="app-container"> {/* Changed class name */}
      <div className="app-content"> {/* Added wrapper div */}
        <h1 className="app-title">Bloom Calendar</h1>
        <Calendar events={events} />
      </div>
    </div>
  );
}

export default App;