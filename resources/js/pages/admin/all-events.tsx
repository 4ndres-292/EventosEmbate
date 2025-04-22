import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

type Evento = {
    id: number;
    name_event: string;
    description_event: string;
    date_event: string;
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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Todos los Eventos</h1>

                <div className="overflow-auto rounded-lg shadow border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Nombre</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Descripción</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Fecha</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Hora</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Lugar</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {eventos.map((evento) => {
                                const fecha = new Date(evento.date_event);
                                return (
                                    <tr key={evento.id}>
                                        <td className="px-4 py-2 text-sm">{evento.id}</td>
                                        <td className="px-4 py-2 text-sm">{evento.name_event}</td>
                                        <td className="px-4 py-2 text-sm">{evento.description_event}</td>
                                        <td className="px-4 py-2 text-sm">
                                            {fecha.toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 text-sm">
                                            {fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-4 py-2 text-sm">{evento.owner ?? 'No especificado'}</td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <Link
                                                href={`/event-edit/${evento.id}`}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(evento.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Eliminar
                                            </button>
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
