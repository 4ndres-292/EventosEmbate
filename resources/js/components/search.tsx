import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function SearchEvent() {
  const [filters, setFilters] = useState({
    name_event: '',
    start_date: '',
    end_date: '',
  });

  const handleSearch = () => {
    router.get('/admin/eventos/buscar', filters);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Buscar Eventos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre del evento"
          value={filters.name_event}
          onChange={e => setFilters({ ...filters, name_event: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={filters.start_date}
          onChange={e => setFilters({ ...filters, start_date: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={filters.end_date}
          onChange={e => setFilters({ ...filters, end_date: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  );
}
