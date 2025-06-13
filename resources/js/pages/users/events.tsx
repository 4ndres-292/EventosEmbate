import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';
import ModalSuccess from '@/components/modalSuccess';
import SeeMore from '@/pages/users/seeMore';

type Evento = {
    id: number;
    name_event: string;
    description_event: string;
    date_event: string;
    image_event: string;
    location: string;
    owner: string;
};

interface Props {
    eventos: Evento[];
    inscritos: number[]; // recibe array de IDs de eventos inscritos
}

export default function Events({ eventos, inscritos = [] }: Props) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [inscritosIds, setInscritosIds] = useState<number[]>(inscritos);
    const [loadingIds, setLoadingIds] = useState<number[]>([]);

    const inscribirse = async (id: number) => {
        await router.post(`/events/${id}/register`, {}, {
            onSuccess: () => {
                setInscritosIds((prev) => [...prev, id]);
                setShowSuccessModal(true);
                setErrorMessage(null);
            },
            onError: () => setErrorMessage('Error al inscribirse.'),
        });
    };

    const desinscribirse = async (id: number) => {
        await router.delete(`/events/${id}/unregister`, {
            onSuccess: () => {
                setInscritosIds((prev) => prev.filter((eid) => eid !== id));
                setShowSuccessModal(true);
                setErrorMessage(null);
            },
            onError: () => setErrorMessage('Error al desinscribirse.'),
        });
    };

    const handleInscripcion = async (id: number) => {
        if (loadingIds.includes(id)) return;
        setLoadingIds((prev) => [...prev, id]);

        if (inscritosIds.includes(id)) {
            await desinscribirse(id);
        } else {
            await inscribirse(id);
        }

        setLoadingIds((prev) => prev.filter((eid) => eid !== id));
    };

    const filteredEventos = eventos.filter((evento) =>
        evento.name_event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.description_event.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Eventos disponibles" />
            <WelcomeHeader />

            <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                        Eventos disponibles
                    </h1>

                    {errorMessage && (
                        <div className="mb-6 text-center text-red-600 font-semibold">
                            {errorMessage}
                        </div>
                    )}

                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Buscar evento..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border rounded shadow-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-8">
                        {filteredEventos.map((evento) => {
                            const yaInscrito = inscritosIds.includes(evento.id);
                            const isLoading = loadingIds.includes(evento.id);

                            return (
                                <div
                                    key={evento.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center"
                                >
                                    {evento.image_event && (
                                        <img
                                            src={`/${evento.image_event}`}
                                            alt={evento.name_event}
                                            className="w-full md:w-1/3 h-64 object-cover"
                                        />
                                    )}

                                    <div className="p-6 flex-1 flex flex-col items-center md:items-start">
                                        <h2 className="text-2xl font-semibold mb-2 text-center md:text-left text-gray-800 dark:text-white">
                                            {evento.name_event}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-center md:text-left">
                                            {evento.description_event}
                                        </p>
                                        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                                            <button
                                                onClick={() => {
                                                    setSelectedEvent(evento);
                                                    setShowSeeMore(true);
                                                }}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                Ver más
                                            </button>

                                            <button
                                                onClick={() => handleInscripcion(evento.id)}
                                                disabled={isLoading}
                                                className={`
                                                    ${yaInscrito
                                                        ? 'bg-gray-400 hover:bg-gray-500'
                                                        : 'bg-green-500 hover:bg-green-600'
                                                    }
                                                    text-white px-4 py-2 rounded
                                                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                                                `}
                                            >
                                                {isLoading
                                                    ? 'Procesando...'
                                                    : yaInscrito
                                                        ? 'Inscrito (Cancelar)'
                                                        : 'Inscribirme'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredEventos.length === 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-300">
                                No se encontraron eventos que coincidan con la búsqueda.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <WelcomeFooter />

            <ModalSuccess
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message="¡Operación realizada exitosamente!"
            />

            {showSeeMore && selectedEvent && (
                <SeeMore
                    event={selectedEvent}
                    onClose={() => setShowSeeMore(false)}
                />
            )}
        </>
    );
}
