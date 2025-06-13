import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
// import { WelcomeFooter } from '@/components/welcome-footer';

type Evento = {
  id: number;
  name_event: string;
  description_event: string;
  date_event: string;
  location: string;
  owner: string | null;
  created_at: string;
  updated_at: string;
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
                  'Descripción',
                  'Fecha',
                  'Hora',
                  'Ubicación',
                  'Creador',
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
              {eventos.map((evento) => {
                const fecha = new Date(evento.date_event);
                return (
                  <tr
                    key={evento.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {evento.id}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {evento.name_event}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 truncate max-w-xs">
                      {evento.description_event}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {fecha.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {fecha.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {evento.location}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                      {evento.owner ?? 'N/A'}
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
      {/* <WelcomeFooter /> */}
    </>
  );
}
