// EventEdit.tsx
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
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
};

type Props = {
    event: {
        id: number;
        name_event: string;
        description_event: string;
        image_event: string;
        date_event: string;
    };
};

export default function EventEdit({ event }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm<EventForm>({
        name_event: event.name_event,
        description_event: event.description_event,
        image_event: event.image_event,
        date_event: event.date_event,
    });

    useEffect(() => {
        setData({
            name_event: event.name_event,
            description_event: event.description_event,
            image_event: event.image_event,
            date_event: event.date_event,
        });
    }, [event]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/event-update/${event.id}`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthLayout title="Editar evento" description="Modifica los datos del evento">
            <Head title="Editar Evento" />
            <form 
                className="flex flex-col gap-6" 
                onSubmit={submit}
                encType="multipart/form-data"
            >
                {/* Los campos son similares al de creación, solo cambia el submit */}
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
                            Guardar Cambios
                        </Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
