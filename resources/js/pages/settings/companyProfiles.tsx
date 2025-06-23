import { Head, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import MapEvents from '@/components/MapEvents';  // Ajusta la ruta según tu estructura

import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';


type CompanyForm = {
  name: string;
  description: string;
  area: string;
  location: string;
  representative: string;
  email: string;
  phone: string;
  logo: File | null; // ahora es un archivo
  password: string;
  password_confirmation: string;
};

export default function CompanyProfiles() {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<CompanyForm>({
    name: '',
    description: '',
    area: '',
    location: '',
    representative: '',
    email: '',
    phone: '',
    logo: null,
    password: '',
    password_confirmation: '',
  });

  const [imgPreview, setImgPreview] = useState<string | null>(null);

  useEffect(() => {
    if (data.logo) {
      const url = URL.createObjectURL(data.logo);
      setImgPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImgPreview(null);
    }
  }, [data.logo]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('companies.store'), {
      onSuccess: () => reset(),
    });
  };

  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    axios.get('/api/typeEntrepreneurship')
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los tipos de emprendimiento:', error);
      });
  }, []);


  return (
    <>
      <Head title="Crear perfil de Empresa/Emprendimiento" />
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Crear Empresa/Emprendimiento" description="Ingrese los datos para crear una nueva empresa o emprendimiento" />

          <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre de la Empresa/Emprendimiento</Label>
              <Input
                id="name"
                type="text"
                required
                autoFocus
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                placeholder="Nombre de la empresa/emprendimiento"
              />
              <InputError message={errors.name} />
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                type="text"
                required
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                disabled={processing}
                placeholder="Descripción corta"
              />
              <InputError message={errors.description} />
            </div>

            {/* Área (tipo de emprendimiento) */}
            <div className="grid gap-2">
              <Label htmlFor="area">Área / Tipo de Emprendimiento</Label>
              <select
                id="area"
                required
                value={data.area}
                onChange={(e) => setData('area', e.target.value)}
                disabled={processing}
                className="bg-white dark:bg-black border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Seleccione un tipo</option>
                {types.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              <InputError message={errors.area} />
            </div>

            {/* Ubicación en Mapa */}
<div className="grid gap-2">
  <Label htmlFor="location">Ubicación geográfica</Label>
  <div className="h-64 rounded overflow-hidden border dark:border-gray-600">
    <MapContainer
      center={[-17.78629, -63.18117]} // puedes centrar en Bolivia u otro
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      {data.location && (
        <Marker
          position={data.location.split(',').map(Number) as [number, number]}
        />
      )}
      <MapEvents onSelectLocation={(coords) => setData('location', coords)} />
    </MapContainer>
  </div>
  <p className="text-sm text-gray-600 dark:text-gray-300">
    Haz clic en el mapa para seleccionar una ubicación
  </p>
  <InputError message={errors.location} />
</div>


            {/* Representante */}
            <div className="grid gap-2">
              <Label htmlFor="representative">Representante</Label>
              <Input
                id="representative"
                type="text"
                required
                value={data.representative}
                onChange={(e) => setData('representative', e.target.value)}
                disabled={processing}
                placeholder="Nombre del representante legal"
              />
              <InputError message={errors.representative} />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                disabled={processing}
                placeholder="contacto@compania.com"
              />
              <InputError message={errors.email} />
            </div>

            {/* Teléfono */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                disabled={processing}
                placeholder="+591 7XXXXXXX"
              />
              <InputError message={errors.phone} />
            </div>

            {/* Logo archivo */}
            <div className="grid gap-2">
              <Label htmlFor="logo">Logo de la Compañía</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setData('logo', e.target.files[0]);
                  }
                }}
                disabled={processing}
              />
              <InputError message={errors.logo} />
            </div>

            {/* Preview de imagen */}
            {imgPreview ? (
              <img
                src={imgPreview}
                alt="Vista previa del logo"
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                Sin imagen
              </div>
            )}

            {/* Contraseña */}
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                disabled={processing}
                placeholder="Contraseña"
              />
              <InputError message={errors.password} />
            </div>

            {/* Confirmar contraseña */}
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
              <Input
                id="password_confirmation"
                type="password"
                required
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                disabled={processing}
                placeholder="Confirmar contraseña"
              />
              <InputError message={errors.password_confirmation} />
            </div>

            {/* Botón enviar */}
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Crear Empresa/Emprendimiento
              </Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-150 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <p className="text-sm text-green-600">¡Perfil creado exitosamente!</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </>
  );
}
