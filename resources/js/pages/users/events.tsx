import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header'; // Importa el nuevo componente
import { WelcomeFooter } from '@/components/welcome-footer';

type Evento = {
    id: number;
    name_event: string;
    description_event: string;
    date_event: string;
    image_event: string | null;
};

interface Props {
    eventos: Evento[];
}

export default function Events({ eventos }: Props) {
    const [mensaje, setMensaje] = useState<string | null>(null);

    const inscribirse = async (id: number) => {
        try {
            router.post(`/events/${id}/register`, {}, {
            onSuccess: () => setMensaje('Inscripción exitosa.'),
            onError: (errors) => setMensaje('Error al inscribirse.'),
            });
        } catch (error) {
            setMensaje('Ocurrió un error en la conexión.');
        }
    };

    return (
        <>
            <Head title="Eventos disponibles" />
            <WelcomeHeader />
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">Eventos disponibles</h1>

                    {mensaje && (
                        <div className="mb-6 text-center text-green-700 font-semibold">
                            {mensaje}
                        </div>
                    )}

                    <div className="space-y-8">
                        {eventos.map((evento) => (
                            <div
                                key={evento.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center"
                            >
                                {evento.image_event && (
                                    <img
                                        src={`/${evento.image_event}`}
                                        alt={evento.name_event}
                                        className="w-full md:w-1/3 h-64 object-cover"
                                    />
                                )}
                                <div className="p-6 flex-1 flex flex-col items-center md:items-start">
                                    <h2 className="text-2xl font-semibold mb-2 text-center md:text-left">
                                        {evento.name_event}
                                    </h2>
                                    <p className="text-gray-600 mb-4 text-center md:text-left">{evento.description_event}</p>
                                    <div className="flex gap-4">
                                        <Link
                                            href={`/event-detail/${evento.id}`}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Ver más
                                        </Link>
                                        <button
                                            onClick={() => inscribirse(evento.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Inscribirme
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <WelcomeFooter />
        </>
    );
}
