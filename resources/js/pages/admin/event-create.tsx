import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type EventForm = {
    name_event: string;
    description_event: string;
    image_event: File | string;
    date_event: string;
    location: string;
};

export default function EventCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<EventForm>>({
        name_event: '',
        description_event: '',
        image_event: '',
        date_event: '',
        location: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/event-create', {
            onSuccess: () => reset(),
        });
    };

    // Obtener ubicaciones desde API
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('api/locations');
                setLocations(response.data.map((loc: { name: string }) => loc.name));
            } catch (error) {
                console.error("Error al cargar ubicaciones", error);
            }
        };
    
        fetchLocations();
    }, []);
    

    return (
        <AuthLayout title="Crear un evento" description="Ingresa los datos para crear tu evento">
            <Head title="Evento" />
            <form 
                className="flex flex-col gap-6" 
                onSubmit={submit}
                encType="multipart/form-data"
            >
                <div className="grid gap-6">
                    {/* Nombre del evento */}
                    <div className="grid gap-2">
                        <Label htmlFor="name_event">Nombre del evento</Label>
                        <Input
                            id="name_event"
                            type="text"
                            required
                            autoFocus
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

                    {/* Fecha */}
                    <div className="grid gap-2">
                        <Label htmlFor="date_event">Fecha del evento</Label>
                        <Input
                            id="date_event"
                            type="date"
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
                            {locations.map((type) => (
                                <option key={type} value={type}>
                                    {type}
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
                            onClick={() => reset()}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="animate-spin mr-2" />}
                            Crear Evento
                        </Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
