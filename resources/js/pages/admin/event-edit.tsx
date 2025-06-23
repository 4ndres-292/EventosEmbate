import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState, FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import axios from 'axios';
import { WelcomeHeader } from '@/components/welcome-header';

type Schedule = {
  id?: number;
  start_datetime: string;
  end_datetime: string;
};

type EventForm = {
  name_event: string;
  description_event: string;
  image_event: File | string | null;
  location: string;
  schedules: Schedule[];
};

type Props = {
  event: {
    id: number;
    name_event: string;
    description_event: string;
    image_event: string | null;
    location: string;
    schedules: Schedule[];
  };
};

export default function EventEdit({ event }: Props) {
  const { data, setData, processing, errors, reset } = useForm<EventForm>({
    name_event: event.name_event,
    description_event: event.description_event,
    image_event: event.image_event,
    location: event.location || '',
    schedules: event.schedules.map(s => ({
      id: s.id,
      start_datetime: formatDateForInput(s.start_datetime),
      end_datetime: formatDateForInput(s.end_datetime),
    })),
  });

  const [locations, setLocations] = useState<string[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  useEffect(() => {
    axios.get('/api/locations')
      .then(res => {
        setLocations(res.data.map((loc: { name: string }) => loc.name));
        setIsLoadingLocations(false);
      })
      .catch(err => {
        console.error("Error al cargar ubicaciones", err);
        setIsLoadingLocations(false);
      });
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('name_event', data.name_event);
    formData.append('description_event', data.description_event);
    formData.append('location', data.location);

    if (typeof data.image_event !== 'string' && data.image_event) {
      formData.append('image_event', data.image_event);
    }

    data.schedules.forEach((schedule, index) => {
      if (schedule.id) {
        formData.append(`schedules[${index}][id]`, schedule.id.toString());
      }
      formData.append(`schedules[${index}][start_datetime]`, schedule.start_datetime);
      formData.append(`schedules[${index}][end_datetime]`, schedule.end_datetime);
    });

    Inertia.post(`/event-update/${event.id}`, formData, {
      onSuccess: () => reset(),
      forceFormData: true,
      preserveScroll: true,
    });
  };

  function updateSchedule(index: number, field: keyof Schedule, value: string) {
    const updated = [...data.schedules];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setData('schedules', updated);
  }

  function addSchedule() {
    setData('schedules', [...data.schedules, { start_datetime: '', end_datetime: '' }]);
  }

  function removeSchedule(index: number) {
    const newSchedules = data.schedules.filter((_, i) => i !== index);
    setData('schedules', newSchedules);
  }

  const getError = (field: string) => {
    return errors[field as keyof typeof errors] ??
           errors[`schedules.${field}` as keyof typeof errors] ??
           '';
  };

  return (
    <>
      <WelcomeHeader />
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
              <InputError message={getError('name_event')} />
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
              <InputError message={getError('description_event')} />
            </div>

            {/* Imagen actual separada visualmente */}
            {event.image_event && (
              <div className="mb-2">
                <p className="text-sm text-gray-500">Imagen actual:</p>
                <img 
                  src={event.image_event}
                  alt="Imagen actual del evento"
                  className="h-20 object-cover rounded"
                />
              </div>
            )}

            {/* Campo para subir nueva imagen */}
            <div className="grid gap-2">
              <Label htmlFor="image_event">Nueva imagen del evento</Label>
              <Input
                id="image_event"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setData('image_event', e.target.files[0]);
                  }
                }}
              />
              <InputError message={getError('image_event')} />
            </div>

            {/* Ubicación */}
            <div className="grid gap-2">
              <Label htmlFor="location">Ubicación</Label>
              {isLoadingLocations ? (
                <p>Cargando ubicaciones...</p>
              ) : (
                <select
                  id="location"
                  required
                  className="border p-2 rounded-md bg-white dark:bg-zinc-800"
                  value={data.location}
                  onChange={(e) => setData('location', e.target.value)}
                >
                  <option value="">Selecciona una ubicación</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              )}
              <InputError message={getError('location')} />
            </div>

            {/* Horarios */}
            <div className="grid gap-2">
              <Label>Fechas y horarios</Label>
              {data.schedules.map((schedule, index) => (
                <div key={index} className="flex gap-2 items-center mb-3">
                  <div className="flex flex-col flex-1">
                    <Label htmlFor={`start_datetime_${index}`}>Inicio</Label>
                    <Input
                      id={`start_datetime_${index}`}
                      type="datetime-local"
                      required
                      value={schedule.start_datetime}
                      onChange={(e) => updateSchedule(index, 'start_datetime', e.target.value)}
                      className="bg-white dark:bg-zinc-800"
                    />
                    <InputError message={getError(`${index}.start_datetime`)} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <Label htmlFor={`end_datetime_${index}`}>Fin</Label>
                    <Input
                      id={`end_datetime_${index}`}
                      type="datetime-local"
                      required
                      value={schedule.end_datetime}
                      onChange={(e) => updateSchedule(index, 'end_datetime', e.target.value)}
                      className="bg-white dark:bg-zinc-800"
                    />
                    <InputError message={getError(`${index}.end_datetime`)} />
                  </div>
                  <div className="mt-6">
                    {data.schedules.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        className="h-10"
                        onClick={() => removeSchedule(index)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addSchedule}
                className="mt-2"
              >
                + Agregar fecha y horario
              </Button>
              <InputError message={getError('schedules')} />
            </div>

            {/* Botones */}
            <div className="flex gap-2 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => window.history.back()}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={processing || isLoadingLocations}
                className="flex items-center"
              >
                {processing && <LoaderCircle className="animate-spin mr-2 h-4 w-4" />}
                Guardar Cambios
              </Button>
            </div>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}

// Helper: Formatear string fecha a 'datetime-local'
function formatDateForInput(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
