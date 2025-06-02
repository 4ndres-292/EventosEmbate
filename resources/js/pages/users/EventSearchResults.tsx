import React, { useState } from 'react';

type Event = {
  id: number;
  name_event: string;
  date_event: string;
  description_event?: string;
};

type Props = {
  events: Event[];
};

const EventSearchResult: React.FC<Props> = ({ events }) => {
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredEvents = events.filter((event) => {
    const nameMatch = event.name_event.toLowerCase().includes(search.toLowerCase());
    const date = new Date(event.date_event);

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateInRange =
      (!start || date >= start) &&
      (!end || date <= end);

    return nameMatch && dateInRange;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Buscar eventos</h2>
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="date"
            className="border p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id} className="mb-2 border p-2">
            <strong>{event.name_event}</strong><br />
            Fecha: {event.date_event}<br />
            {event.description_event && <span>{event.description_event}</span>}
          </li>
        ))}
        {filteredEvents.length === 0 && <p>No se encontraron eventos.</p>}
      </ul>
    </div>
  );
};

export default EventSearchResult;
