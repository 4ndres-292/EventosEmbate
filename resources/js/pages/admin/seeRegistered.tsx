import { Head, usePage } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
// import { WelcomeFooter } from '@/components/welcome-footer';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  type_participant: string;
}

interface Event {
  id: number;
  name_event: string;
}

export default function SeeRegistered() {
  const { props } = usePage<{ event: Event; users: User[] }>();
  const event = props.event;
  const users = props.users;

  return (
    <>
      <Head title="Ver registrados" />
      <WelcomeHeader />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          Usuarios registrados en: {event.name_event}
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <table className="w-full table-auto border-collapse text-gray-800 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                {[
                  'Nombre',
                  'Correo',
                  'Celular',
                  'Género',
                  'Tipo de Participante',
                ].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm break-words max-w-xs">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">
                      {user.phone}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">
                      {user.gender}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">
                      {user.type_participant}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-6 text-gray-600 dark:text-gray-400 italic"
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <WelcomeFooter /> */}
    </>
  );
}
