import { Head, usePage } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

interface User {
  id: number;
  name: string;
  email: string;
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
      <WelcomeHeader/>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Usuarios registrados en: {event.name_event}</h1>

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Correo</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="text-center p-4">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <WelcomeFooter /> */}
    </>
  );
}
