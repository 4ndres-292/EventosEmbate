import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Todos los Eventos</h1>

                <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold border">ID</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold border">Nombre</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold border">Descripción</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold border">Fecha</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold border">Hora</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold border">Ubicación</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold border">Creador</th>
                                <th className="px-4 py-2 text-center text-sm font-semibold border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {eventos.map((evento) => {
                                const fecha = new Date(evento.date_event);
                                return (
                                    <tr key={evento.id} className="hover:bg-gray-100 transition duration-150">
                                        <td className="px-4 py-2 text-sm border">{evento.id}</td>
                                        <td className="px-4 py-2 text-sm border">{evento.name_event}</td>
                                        <td className="px-4 py-2 text-sm border">{evento.description_event}</td>
                                        <td className="px-4 py-2 text-sm border">
                                            {fecha.toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 text-sm border">
                                            {fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-4 py-2 text-sm border">{evento.location}</td>
                                        <td className="px-4 py-2 text-sm border">{evento.owner}</td>
                                        <td className="px-4 py-2 border text-center">
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
