import { Link } from '@inertiajs/react';
import { Head, router } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';

type Schedule = {
  id: number;
  start_datetime: string;
  end_datetime: string;
};

type Evento = {
  id: number;
  name_event: string;
  description_event: string;
  image_event: string | null;
  location: string;
  owner: string | null;
  created_at: string;
  updated_at: string;
  schedules: Schedule[];
};

interface Props {
  eventos: Evento[];
}

export default function AllEvents({ eventos }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      router.delete(`/event-delete/${id}`);
    }
  };

  // Función para formatear fechas
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Head title="Todos los Eventos" />
      <WelcomeHeader />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          Todos los Eventos
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-600 dark:bg-blue-700 text-white">
              <tr>
                {[
                  'ID',
                  'Nombre',
                  'Imagen',
                  'Ubicación',
                  'Creador',
                  'Horarios',
                  'Acciones',
                ].map((title) => (
                  <th
                    key={title}
                    className="px-4 py-3 text-left text-sm font-semibold border border-blue-700 dark:border-blue-600"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              {eventos.map((evento) => (
                <tr
                  key={evento.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                    {evento.id}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                    <div className="font-semibold">{evento.name_event}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {evento.description_event}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                    {evento.image_event && (
                      <img 
                        src={evento.image_event} 
                        alt={evento.name_event}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                    {evento.location}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                    {evento.owner ?? 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                    <div className="max-h-32 overflow-y-auto">
                      {evento.schedules.length > 0 ? (
                        evento.schedules.map((schedule, idx) => (
                          <div key={schedule.id} className="mb-1">
                            <div className="text-xs font-medium">
                              {formatDateTime(schedule.start_datetime)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              a {formatDateTime(schedule.end_datetime)}
                            </div>
                            {idx < evento.schedules.length - 1 && (
                              <div className="border-b border-gray-200 dark:border-gray-700 my-1"></div>
                            )}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">Sin horarios</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        href={`/event-edit/${evento.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-md transition"
                      >
                        Editar
                      </Link>
                      <Link
                        href={`/events/${evento.id}/registered-users`}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition"
                      >
                        Ver Participantes
                      </Link>
                      <button
                        onClick={() => handleDelete(evento.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}