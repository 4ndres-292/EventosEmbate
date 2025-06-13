import { Head, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import axios from 'axios';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

type EventForm = {
    name_event: string;
    description_event: string;
    image_event: File | string;
    date_event: string;
    location: string;
};

type Props = {
    event: {
        id: number;
        name_event: string;
        description_event: string;
        image_event: string;
        date_event: string;
        location: string;
    };
};

export default function EventEdit({ event }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm<EventForm>({
        name_event: event.name_event,
        description_event: event.description_event,
        image_event: event.image_event,
        date_event: formatDateForInput(event.date_event),
        location: event.location || '',
    });

    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        setData({
            name_event: event.name_event,
            description_event: event.description_event,
            image_event: event.image_event,
            date_event: formatDateForInput(event.date_event),
            location: event.location || '',
        });
    }, [event]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('/api/locations');
                setLocations(response.data.map((loc: { name: string }) => loc.name));
            } catch (error) {
                console.error("Error al cargar ubicaciones", error);
            }
        };
        fetchLocations();
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/event-update/${event.id}`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
        <WelcomeHeader/> 
        <AuthLayout title="Editar evento" description="Modifica los datos del evento">
            <Head title="Editar Evento" />
            <form
                className="flex flex-col gap-6"
                onSubmit={submit}
                encType="multipart/form-data"
            >
                <div className="grid gap-6">
                    {/* Nombre */}
                    <div className="grid gap-2">
                        <Label htmlFor="name_event">Nombre del evento</Label>
                        <Input
                            id="name_event"
                            type="text"
                            required
                            value={data.name_event}
                            onChange={(e) => setData('name_event', e.target.value)}
                            placeholder="Ej: Fiesta de cumpleaños"
                        />
                        <InputError message={errors.name_event} />
                    </div>

                    {/* Descripción */}
                    <div className="grid gap-2">
                        <Label htmlFor="description_event">Descripción</Label>
                        <Input
                            id="description_event"
                            type="text"
                            required
                            value={data.description_event}
                            onChange={(e) => setData('description_event', e.target.value)}
                            placeholder="Describe tu evento..."
                        />
                        <InputError message={errors.description_event} />
                    </div>

                    {/* Imagen */}
                    <div className="grid gap-2">
                        <Label htmlFor="image_event">Imagen del evento</Label>
                        <Input
                            id="image_event"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData('image_event', e.target.files[0]);
                                }
                            }}
                        />
                        <InputError message={errors.image_event} />
                    </div>

                    {/* Fecha y hora */}
                    <div className="grid gap-2">
                        <Label htmlFor="date_event">Fecha y hora del evento</Label>
                        <Input
                            id="date_event"
                            type="datetime-local"
                            required
                            value={data.date_event}
                            onChange={(e) => setData('date_event', e.target.value)}
                        />
                        <InputError message={errors.date_event} />
                    </div>

                    {/* Ubicación */}
                    <div className="grid gap-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <select
                            id="location"
                            required
                            className="border p-2 rounded-md"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        >
                            <option value="">Selecciona una ubicación</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.location} />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-2">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => router.visit('/')}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="animate-spin mr-2" />}
                            Guardar Cambios
                        </Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
        </>
    );
}

// Helper para convertir fecha a formato datetime-local
function formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
}
