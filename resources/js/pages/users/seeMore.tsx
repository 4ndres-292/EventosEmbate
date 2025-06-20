import Modal from '@/components/modal';
import { resolveImageUrl } from '@/utils/image';

type Schedule = {
  id: number;
  start_datetime: string;
  end_datetime: string;
};

type EventType = {
  name_event: string;
  description_event: string;
  date_event: string;
  image_event: string | null;
  location: string;
  schedules: Schedule[];
};

interface Props {
  event: EventType;
  onClose: () => void;
}

export default function SeeMore({ event, onClose }: Props) {
  const imgUrl = resolveImageUrl(event.image_event);

  // Formatea solo la fecha en dd/MM/yyyy (en locale es-ES).
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  // Formatea solo la hora en HH:MM
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Extraer fechas únicas de los schedules
  const uniqueDates: string[] = Array.isArray(event.schedules)
    ? Array.from(
        new Set(
          event.schedules.map((s) => formatDate(s.start_datetime))
        )
      )
    : [];

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {event.name_event}
      </h2>

      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {event.description_event}
      </p>

      {imgUrl ? (
        <img
          src={imgUrl}
          alt={event.name_event}
          className="mt-4 w-full rounded-lg object-cover"
        />
      ) : (
        <div className="mt-4 w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 rounded-lg">
          Sin imagen
        </div>
      )}

      {/* Fecha del Evento: mostramos fechas únicas */}
      <div className="mt-4">
        <p className="text-gray-900 dark:text-gray-100 font-semibold">
          Fecha del Evento:
        </p>
        {uniqueDates.length > 0 ? (
          <div className="ml-4 space-y-1">
            {uniqueDates.map((d) => (
              <p key={d} className="text-gray-800 dark:text-gray-200">
                {d}
              </p>
            ))}
          </div>
        ) : (
          <p className="ml-4 text-gray-500 dark:text-gray-400">
            No hay fechas disponibles
          </p>
        )}
      </div>

      {/* Ubicación */}
      <p className="mt-4 text-gray-900 dark:text-gray-100">
        <strong>Ubicación:</strong> {event.location}
      </p>

      {/* Horarios en tabla */}
      <div className="mt-6">
        <p className="text-gray-900 dark:text-gray-100 font-semibold">Horarios:</p>
        {Array.isArray(event.schedules) && event.schedules.length > 0 ? (
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium border border-gray-300 dark:border-gray-700">
                    Fecha
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium border border-gray-300 dark:border-gray-700">
                    Hora de Inicio
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium border border-gray-300 dark:border-gray-700">
                    Hora de Fin
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                {event.schedules.map((schedule) => {
                  const fecha = formatDate(schedule.start_datetime);
                  const horaInicio = formatTime(schedule.start_datetime);
                  const horaFin = formatTime(schedule.end_datetime);
                  return (
                    <tr key={schedule.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                        {fecha}
                      </td>
                      <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                        {horaInicio}
                      </td>
                      <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
                        {horaFin}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sin horarios registrados
          </p>
        )}
      </div>
    </Modal>
  );
}
