// resources/js/Components/Search.tsx

import React, { useState } from 'react'
import { router } from '@inertiajs/react'

type Props = {
  className?: string
  routeName?: string
}

const Search: React.FC<Props> = ({ className = '', routeName = '/admin/eventos/buscar' }) => {
  const [nameEvent, setNameEvent] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    router.get(routeName, {
      name_event: nameEvent,
      start_date: startDate,
      end_date: endDate,
    })
  }

  return (
    <form onSubmit={handleSearch} className={`flex flex-col gap-4 ${className}`}>
      <input
        type="text"
        placeholder="Nombre del evento"
        value={nameEvent}
        onChange={(e) => setNameEvent(e.target.value)}
        className="border p-2 rounded"
      />

      <div className="flex gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  )
}

export default Search
