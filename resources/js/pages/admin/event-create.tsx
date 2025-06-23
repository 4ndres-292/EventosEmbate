import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import axios from 'axios';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

import { WelcomeHeader } from '@/components/welcome-header';
import { router } from '@inertiajs/react';

type Schedule = {
  start_datetime: string;
  end_datetime: string;
};

type EventForm = {
  name_event: string;
  description_event: string;
  image_event: File | string;
  location: string;
  schedules: Schedule[];
};

export default function EventCreate() {
  const { data, setData, post, processing, errors, reset } = useForm<EventForm>({
    name_event: '',
    description_event: '',
    image_event: '',
    location: '',
    schedules: [{ start_datetime: '', end_datetime: '' }],
  });

  const [locations, setLocations] = useState<string[]>([]);

  // Carga de ubicaciones
  useState(() => {
    axios.get('/api/locations')
      .then(response => {
        setLocations(response.data.map((loc: { name: string }) => loc.name));
      })
      .catch(error => {
        console.error("Error al cargar ubicaciones", error);
      });
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/event-create', {
      onSuccess: () => reset(),
    });
  };

  function updateSchedule(index: number, field: keyof Schedule, value: string) {
    const newSchedules = [...data.schedules];
    newSchedules[index][field] = value;
    setData('schedules', newSchedules);
  }

  function addSchedule() {
    setData('schedules', [...data.schedules, { start_datetime: '', end_datetime: '' }]);
  }

  function removeSchedule(index: number) {
    const newSchedules = data.schedules.filter((_, i) => i !== index);
    setData('schedules', newSchedules);
  }

  const typedErrors = errors as Record<string, string>; // ✅ Corrección de tipos

  return (
    <>
      <WelcomeHeader />
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
              <InputError message={typedErrors.name_event} />
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
              <InputError message={typedErrors.description_event} />
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
              <InputError message={typedErrors.image_event} />
            </div>

            {/* Ubicación */}
            <div className="grid gap-2">
              <Label htmlFor="location">Ubicación</Label>
              <select
                id="location"
                required
                className="border p-2 rounded-md bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
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
              <InputError message={typedErrors.location} />
            </div>

            {/* Horarios */}
            <div className="grid gap-2">
              <Label>Fechas y horarios</Label>
              {data.schedules.map((schedule, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <Label htmlFor={`start_datetime_${index}`}>Inicio</Label>
                    <Input
                      id={`start_datetime_${index}`}
                      type="datetime-local"
                      required
                      className="bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
                      value={schedule.start_datetime}
                      onChange={(e) => updateSchedule(index, 'start_datetime', e.target.value)}
                    />
                    <InputError message={typedErrors[`schedules.${index}.start_datetime`]} />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor={`end_datetime_${index}`}>Fin</Label>
                    <Input
                      id={`end_datetime_${index}`}
                      type="datetime-local"
                      required
                      className="bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
                      value={schedule.end_datetime}
                      onChange={(e) => updateSchedule(index, 'end_datetime', e.target.value)}
                    />
                    <InputError message={typedErrors[`schedules.${index}.end_datetime`]} />
                  </div>
                  {data.schedules.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="h-10 mt-6"
                      onClick={() => removeSchedule(index)}
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addSchedule}
              >
                + Agregar fecha y horario
              </Button>
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
                Crear Evento
              </Button>
            </div>

          </div>
        </form>
      </AuthLayout>
    </>
  );
}
