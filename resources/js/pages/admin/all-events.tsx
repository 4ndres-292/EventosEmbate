import { Link, Head, router } from '@inertiajs/react';
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

  const resolveImageUrl = (path: string | null): string | null => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/storage')) {
      return path;
    }
    return `/storage/${path.replace(/^\/+/, '')}`;
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
                {['ID', 'Nombre', 'Descripción', 'Imagen', 'Ubicación', 'Creador', 'Horarios', 'Acciones'].map(
                  (title) => (
                    <th
                      key={title}
                      className="px-4 py-3 text-left text-sm font-semibold border border-blue-700 dark:border-blue-600"
                    >
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              {eventos.map((evento) => {
                const imgUrl = resolveImageUrl(evento.image_event);

                return (
                  <tr
                    key={evento.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {evento.id}
                    </td>

                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 font-semibold">
                      {evento.name_event}
                    </td>

                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      <div className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                        {evento.description_event}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={evento.name_event}
                          className="h-16 w-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-xs text-gray-500 dark:text-gray-400">Sin imagen</span>
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
                          <table className="w-full table-auto text-xs border-collapse">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                              <tr>
                                <th className="border px-2 py-1 dark:border-gray-700">Fecha</th>
                                <th className="border px-2 py-1 dark:border-gray-700">Hora Inicial</th>
                                <th className="border px-2 py-1 dark:border-gray-700">Hora Final</th>
                              </tr>
                            </thead>
                            <tbody>
                              {evento.schedules.map((s) => {
                                const date = new Date(s.start_datetime).toLocaleDateString('es-ES');
                                const start = new Date(s.start_datetime).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                });
                                const end = new Date(s.end_datetime).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                });
                                return (
                                  <tr key={s.id} className="text-center">
                                    <td className="border px-2 py-1 dark:border-gray-700">{date}</td>
                                    <td className="border px-2 py-1 dark:border-gray-700">{start}</td>
                                    <td className="border px-2 py-1 dark:border-gray-700">{end}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-xs">Sin horarios</span>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
